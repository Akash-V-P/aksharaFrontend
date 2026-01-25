import { Play } from "lucide-react";

interface Video {
  _id: string;
  thumbnail: string;
  duration: number;
  views: number;
}

interface VideoCardProp {
  video: Video;
}

function formatDuration( seconds: number ) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoCard({ video }: VideoCardProp) {
  return (
    <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-md bg-muted">
      {/* thumbnail */}
      <img
        src={video.thumbnail}
        alt="Video thumbnail"
        className="h-full w-full object-cover"
      />

      {/* duration */}
      <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
        {formatDuration(video.duration)}
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex items-center gap-1 text-sm text-white">
          <Play size={16} />
          <span>{video.views}</span>
        </div>
      </div>
    </div>
  );
}
