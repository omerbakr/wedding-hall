import { useRef, useState } from "react";

type ImageUploadProps = {
  activeSlug: string;
};

const ImageUpload = ({ activeSlug }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) return setFile(e.target.files[0]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Lütfen dosya seçin.");

    setUploading(true);

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

      alert("Fotoğraf başarıyla yüklendi ve onaya gönderildi!");
      setFile(null);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col justify-center gap-4 mb-5 p-4 border-2 border-primary bg-white rounded-lg sm:hidden"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="
      flex items-center justify-center
      px-4 py-6
      rounded-lg
      text-center
      hover:bg-gray-50
      transition
    "
      >
        📸 Fotoğraf Seç
      </button>

      {file && (
        <p className="text-sm text-gray-600 text-center">
          Seçilen dosya: <strong>{file.name}</strong>
        </p>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50"
      >
        {uploading ? "Yükleniyor..." : "Yükle"}
      </button>
    </form>
  );
};

export default ImageUpload;
