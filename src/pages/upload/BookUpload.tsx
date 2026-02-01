import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { BookUploadSchema } from "@/schema/book.schema";
import type { BookUploadSchemaType } from "@/schema/book.schema";
import { useUploadBook } from "@/hooks/useUploadBook";
import { useAuthStore } from "@/store/auth.store";

import { UploadCloud, Image, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BookUpload() {
  const uploadBookMutation = useUploadBook();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [selectedBook, setSelectedBook] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const bookInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookUploadSchemaType>({
    resolver: zodResolver(BookUploadSchema),
  });

  //Register file fields manually
  useEffect(() => {
    register("bookFile");
    register("coverImage");
  }, [register]);

  //Prevent memory leaks from object URLs
  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  const onSubmit = (data: BookUploadSchemaType) => {
    uploadBookMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Book uploaded successfully");

        setSelectedBook(null);
        setCoverPreview(null);

        if (bookInputRef.current) bookInputRef.current.value = "";
        if (coverInputRef.current) coverInputRef.current.value = "";

        setTimeout(() => {
          navigate(`/profile/${user?.username}`);
        }, 800);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to upload book");
      },
    });
  };


  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Upload Book</h1>
        <p className="text-sm text-muted-foreground">
          Share a book with your audience.
        </p>
      </div>

      {/* eslint-disable-next-line react-hooks/refs */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Book file */}
        <div className="rounded-lg border border-dashed border-black p-8 text-center">
          <UploadCloud className="mx-auto mb-4 text-muted-foreground" />

          {!selectedBook ? (
            <>
              <p className="text-sm font-medium">Upload book file</p>
              <p className="text-xs text-muted-foreground">PDF only</p>

              <Input
                type="file"
                accept=".pdf"
                className="hidden"
                ref={bookInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // Validate file size for max 5MB
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Book file must be under 5MB");
                    e.target.value = ""; // reset input
                    return;
                  }
                  
                  if (file) {
                    setSelectedBook(file);
                    setValue("bookFile", file, { shouldValidate: true });
                  }
                }}
              />

              <Button
                type="button"
                variant="secondary"
                className="mt-4"
                onClick={() => bookInputRef.current?.click()}
              >
                Select book
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <BookOpen className="text-muted-foreground" />
              <p className="text-sm font-medium">{selectedBook.name}</p>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSelectedBook(null);
                  setValue("bookFile", undefined as any);
                  if (bookInputRef.current) {
                    bookInputRef.current.value = "";
                  }
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {errors.bookFile && (
          <p className="text-sm text-red-500">{errors.bookFile.message}</p>
        )}

        {/* 🖼️ Cover image */}
        <div className="rounded-lg border border-dashed border-black p-6 text-center">
          {!coverPreview ? (
            <>
              <div className="flex items-center justify-center gap-3">
                <Image className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Cover image</p>
                  <p className="text-xs text-muted-foreground">.jpeg or .png</p>
                </div>
              </div>

              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={coverInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setCoverPreview(previewUrl);
                    setValue("coverImage", file, { shouldValidate: true });
                  }
                }}
              />

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => coverInputRef.current?.click()}
              >
                Upload cover
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="h-40 w-28 rounded-md border object-cover"
              />

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (coverPreview) {
                    URL.revokeObjectURL(coverPreview);
                  }
                  setCoverPreview(null);
                  setValue("coverImage", undefined as any);
                  if (coverInputRef.current) {
                    coverInputRef.current.value = "";
                  }
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {errors.coverImage && (
          <p className="text-sm text-red-500">{errors.coverImage.message}</p>
        )}

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title")}
            className="border border-black"
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register("description")}
            rows={5}
            className="border border-black"
            placeholder="Describe your book"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (optional)</label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="border border-black"
              placeholder="₹0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pages (optional)</label>
            <Input
              type="number"
              {...register("pages", { valueAsNumber: true })}
              className="border border-black"
              placeholder="0"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={uploadBookMutation.isPending}
          >
            {uploadBookMutation.isPending
              ? `Uploading ${uploadBookMutation.progress}%`
              : "Upload book"}
          </Button>

          {uploadBookMutation.isPending && (
            <div className="mt-4 h-2 w-full rounded bg-muted">
              <div
                className="h-2 rounded bg-primary transition-all"
                style={{ width: `${uploadBookMutation.progress}%` }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
