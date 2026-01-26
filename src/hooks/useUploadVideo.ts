import { uploadVideo } from "@/api/video.api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (data: any) =>
      uploadVideo(data, (percent) => setProgress(percent)),
  });

  return {
    ...mutation,
    progress,
  };
};
