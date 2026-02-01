import api from "@/api/axios";
import type { UploadProgressCallback } from "@/types/upload";
import type { BookUploadSchemaType } from "@/schema/book.schema";

export const uploadBook = async (
  payload: BookUploadSchemaType,
  setProgress?: UploadProgressCallback
) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("description", payload.description);

  if (payload.price !== undefined) {
    formData.append("price", String(payload.price));
  }

  if (payload.pages !== undefined) {
    formData.append("pages", String(payload.pages));
  }

  formData.append("coverImage", payload.coverImage);
  formData.append("bookFile", payload.bookFile);

  const response = await api.post("/book/", formData, {
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      setProgress?.(percent);
    },
  });

  return response.data;
};
