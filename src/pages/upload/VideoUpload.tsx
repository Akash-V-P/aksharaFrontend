import { UploadCloud, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VideoUpload() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Upload Video</h1>
        <p className="text-sm text-muted-foreground">
          Share a video with your audience.
        </p>
      </div>

      <div className="space-y-8">
        {/* importing video */}
        <div className="rounded-lg border border-black border-dashed p-8 text-center">
          <UploadCloud className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium">Upload video file</p>
          <p className="text-xs text-muted-foreground">
            MP4, MOV or WebM
          </p>

          <Button variant="secondary" className="mt-4">
            Select video
          </Button>
        </div>


        {/* thumbnail */}
        <div className="rounded-lg border border-black border-dashed p-6 text-center">
          <div className="flex items-center justify-center  gap-3">
            <Image className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Thumbnail</p>
              <p className="text-xs text-muted-foreground">
                .jpeg or .png
              </p>
            </div>
          </div>

          <Button variant="secondary" size="sm" className="mt-4">
            Upload thumbnail
          </Button>
        </div>

        {/* title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input className="border border-black" placeholder="Enter video title" />
        </div>

        {/* description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Describe your video"
            rows={5}
            className="border border-black"
          />
        </div>

        {/* submit */}
        <div className="pt-4">
          <Button size="lg">Upload Video</Button>
        </div>
      </div>
    </div>
  );
}
