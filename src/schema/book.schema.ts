import { z } from "zod";

export const BookUploadSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .min(0, "Price cannot be negative")
    .optional(),

  pages: z
    .number()
    .min(1, "Pages must be at least 1")
    .optional(),

  coverImage: z.instanceof(File, {
    message: "Cover image is required",
  }),

  bookFile: z.instanceof(File, {
    message: "Book file is required",
  }),
});

export type BookUploadSchemaType = z.infer<typeof BookUploadSchema>;
