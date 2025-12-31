import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { rateLimit } from "@/utils/ratelimit";
import { createClient } from "@/utils/supabase/server";
import { UPLOAD_CONFIG } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    const ip = realIp || forwardedFor?.split(",")[0].trim() || "127.0.0.1";
    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Günlük fotoğraf yükleme limitiniz doldu!" },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (!file || !slug)
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });

    if (!slugRegex.test(slug) || slug.length < 5 || slug.length > 50)
      return NextResponse.json(
        {
          error:
            "Geçersiz etkinlik ismi! (5-50 karakter, sadece harf, rakam ve tire)",
        },
        { status: 400 }
      );

    if (!Object.keys(UPLOAD_CONFIG.MIMETYPE_MAP).includes(file.type))
      return NextResponse.json(
        {
          error:
            "Sadece resim dosyası (JPG, JPEG, PNG, WEBP, HEIC) yükleyebilirsiniz.",
        },
        { status: 400 }
      );

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE)
      return NextResponse.json(
        { error: "Dosya çok büyük (max 5MB)" },
        { status: 400 }
      );

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: event } = await supabase
      .from("events")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (!event)
      return NextResponse.json(
        { error: "Etkinlik bulunamadı." },
        { status: 404 }
      );

    const fileExt = UPLOAD_CONFIG.MIMETYPE_MAP[file.type];
    const fileName = `${slug}/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("wedding-uploads")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      return NextResponse.json({ error: "Yükleme hatası." }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("wedding-uploads").getPublicUrl(fileName);

    const { error: dbError } = await supabase.from("photos").insert({
      event_slug: slug,
      image_url: publicUrl,
      is_approved: false,
    });

    if (dbError) {
      console.error("Database Error", dbError);

      const { error: deleteError } = await supabase.storage
        .from("wedding-uploads")
        .remove([fileName]);

      if (deleteError) {
        console.error(
          "Critical: Failed to remove orphaned file from storage:",
          fileName
        );
      } else {
        console.info("Cleanup: Uploaded file rolled back:", fileName);
      }

      return NextResponse.json(
        { error: "Veritabanı hatası, işlem iptal edildi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Başarılı!" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected server error during photo upload:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
