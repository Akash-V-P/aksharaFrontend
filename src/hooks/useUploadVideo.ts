import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { uploadVideo } from "@/api/video.api";
import type { VideoUploadSchemaType } from "@/schema/video.schema";
import { useAuthStore } from "@/store/auth.store";

export const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);

  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: (data: VideoUploadSchemaType) =>
      uploadVideo(data, (percent) => {
        setProgress(percent);
      }),

    onSuccess: () => {
      setProgress(0);

      if(!user?._id) return;

      queryClient.invalidateQueries({
        queryKey:["channel-videos", user._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["channel-stats", user._id]
      });
    },

    onError: () => {
      setProgress(0);
    },
  });

  return {
    ...mutation,
    progress,
  };
};
