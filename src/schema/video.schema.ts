import { z } from "zod";

export const VideoUploadSchema = z.object(
    {
        title: z.string().min(4, "Title must be at least 4 characters"),
        description: z.string().min(10, "Description must be at least 10 characters"),
        thumbnail: z.instanceof(File, { message: "Thumbnail is required"} ),
        videoFile: z.instanceof(File, { message: "Video fiel is required"} ),
    }
)

export type VideoUploadSchemaType = z.infer<typeof VideoUploadSchema>