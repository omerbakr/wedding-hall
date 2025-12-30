import { createClient } from "@supabase/supabase-js";

export async function getActiveEventSlug(): Promise<string> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const now = new Date().toISOString();

    const { data: event, error } = await supabase
      .from("events")
      .select("slug")
      .lte("starts_at", now)
      .gte("ends_at", now)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch active event:", error);
      return "";
    }

    return event?.slug || "";
  } catch (err) {
    console.error("Unexpected error in getActiveEventSlug:", err);
    return "";
  }
}
