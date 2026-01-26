import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { VideoUploadSchema } from "@/schema/video.schema";
import type { VideoUploadSchemaType } from "@/schema/video.schema";
import { useUploadVideo } from "@/hooks/useUploadVideo";

import { UploadCloud, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VideoUpload() {
  const uploadVideoMutation = useUploadVideo();

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoUploadSchemaType>({
    resolver: zodResolver(VideoUploadSchema),
  });

  useEffect(() => {
    register("videoFile");
    register("thumbnail");
  }, [register]);

  const onSubmit = (data: VideoUploadSchemaType) => {
    uploadVideoMutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Upload Video</h1>
        <p className="text-sm text-muted-foreground">
          Share a video with your audience.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* importing video */}
        <div className="rounded-lg border border-dashed border-black p-8 text-center">
          <UploadCloud className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium">Upload video file</p>
          <p className="text-xs text-muted-foreground">MP4, MOV or WebM</p>

          <Input
            type="file"
            accept="video/*"
            className="hidden"
            ref={videoInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setValue("videoFile", e.target.files[0], {
                  shouldValidate: true,
                });
              }
            }}
          />

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => videoInputRef.current?.click()}
          >
            Select video
          </Button>
        </div>

        {errors.videoFile && (
          <p className="mt-2 text-sm text-red-500">
            {errors.videoFile.message}
          </p>
        )}

        {/* thumbnail */}
        <div className="rounded-lg border border-dashed border-black p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Image className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Thumbnail</p>
              <p className="text-xs text-muted-foreground">.jpeg or .png</p>
            </div>
          </div>

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={thumbnailInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setValue("thumbnail", e.target.files[0], {
                  shouldValidate: true,
                });
              }
            }}
          />

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => thumbnailInputRef.current?.click()}
          >
            Select thumbnail
          </Button>
        </div>

        {errors.thumbnail && (
          <p className="mt-2 text-sm text-red-500">
            {errors.thumbnail?.message}
          </p>
        )}

        {/* title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title")}
            className="border border-black"
            placeholder="Enter video title"
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register("description")}
            placeholder="Describe your video"
            rows={5}
            className="border border-black"
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* submit */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={uploadVideoMutation.isPending}
            size="lg"
          >
            {uploadVideoMutation.isPending
              ? `Uploading ${uploadVideoMutation.progress}%`
              : "Upload video"}
          </Button>
        </div>
        {uploadVideoMutation.isPending && (
          <div className="mt-4 h-2 w-full rounded bg-muted">
            <div
              className="h-2 rounded bg-primary transition-all"
              style={{ width: `${uploadVideoMutation.progress}%` }}
            />
          </div>
        )}
      </form>
    </div>
  );
}
