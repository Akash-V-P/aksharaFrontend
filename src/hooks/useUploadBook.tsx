import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { uploadBook } from "@/api/book.api";
import type { BookUploadSchemaType } from "@/schema/book.schema";
import { useAuthStore } from "@/store/auth.store";

export const useUploadBook = () => {
  const [progress, setProgress] = useState(0);

  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: (data: BookUploadSchemaType) =>
      uploadBook(data, (percent) => setProgress(percent)),

    onSuccess: () => {
      setProgress(0);

      if (!user?._id) return;

      //if book is successfully uploaded refresh books amd stats
      queryClient.invalidateQueries({
        queryKey: ["channel-books", user._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["channel-stats", user._id],
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
