import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import toast from "react-hot-toast";

import { UPLOAD_CONFIG } from "@/constants";

type ImageUploadProps = {
  activeSlug: string;
};

const ImageUpload = ({ activeSlug }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return toast.error("Fotoğrafın boyutu çok büyük.");
    }

    if (!UPLOAD_CONFIG.ALLOWED_TYPES.includes(selectedFile.type)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return toast.error("Geçersiz dosya tipi.");
    }

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setImagePreviewUrl(previewUrl);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Lütfen bir dosya seçin.");

    setUploading(true);

    const toastId = toast.loading("Fotoğraf yükleniyor...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", activeSlug);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız");
      }

      toast.success("Fotoğraf yüklendi! Onaydan sonra yayına alınacak.", {
        id: toastId,
      });

      setFile(null);
      setImagePreviewUrl(null);
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";

      toast.error(errorMessage || "Bir hata oluştu", {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setFile(null);
    setImagePreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col justify-center gap-4 mb-5 p-4 rounded-lg border-2 border-primary bg-white sm:hidden"
      aria-label="Fotoğraf yükleme formu"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        aria-label="Dosya seçici"
      />

      {!imagePreviewUrl ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex-center gap-2 rounded-lg border border-primary/20 px-4 py-6 text-center text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Fotoğraf seçmek için tıklayın"
        >
          <Camera className="text-primary" aria-hidden="true" />
          Fotoğraf Seç
        </button>
      ) : (
        <div className="col-center relative py-4 overflow-hidden rounded-lg bg-gray-100/50">
          <div className="relative w-24 aspect-square">
            <Image
              src={imagePreviewUrl}
              alt="Yüklenecek fotoğraf önizlemesi"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={uploading}
            className="absolute right-3 top-3 text-primary"
            aria-label="Fotoğrafı kaldır"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading || !file}
        className="rounded-lg bg-primary px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-busy={uploading}
      >
        {uploading ? "Yükleniyor..." : "Yükle"}
      </button>
    </form>
  );
};

export default ImageUpload;
