import { useForm } from "react-hook-form";
import { useRef } from "react";
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

  const onSubmit = (data: BookUploadSchemaType) => {
    uploadBookMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Book uploaded successfully 📘");
        setTimeout(() => {
          navigate(`/profile/${user?.username}`);
        }, 800);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to upload book"
        );
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Upload Book</h1>
        <p className="text-sm text-muted-foreground">
          Share a book with your audience.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* book file */}
        <div className="rounded-lg border border-dashed border-black p-8 text-center">
          <UploadCloud className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium">Upload book file</p>
          <p className="text-xs text-muted-foreground">PDF only</p>

          <Input
            type="file"
            accept=".pdf"
            className="hidden"
            ref={bookInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setValue("bookFile", e.target.files[0], {
                  shouldValidate: true,
                });
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
        </div>

        {errors.bookFile && (
          <p className="mt-2 text-sm text-red-500">
            {errors.bookFile.message}
          </p>
        )}

        {/* cover image */}
        <div className="rounded-lg border border-dashed border-black p-6 text-center">
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
              if (e.target.files?.[0]) {
                setValue("coverImage", e.target.files[0], {
                  shouldValidate: true,
                });
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
        </div>

        {errors.coverImage && (
          <p className="mt-2 text-sm text-red-500">
            {errors.coverImage.message}
          </p>
        )}

        {/* title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title")}
            className="border border-black"
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register("description")}
            rows={5}
            className="border border-black"
            placeholder="Describe your book"
          />
          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* meta */}
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

        {/* submit */}
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

