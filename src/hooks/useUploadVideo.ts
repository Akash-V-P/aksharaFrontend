import { uploadVideo } from "@/api/video.api"
import { useMutation } from "@tanstack/react-query"

export const useUploadVideo = () => {
    return useMutation({
        mutationFn: uploadVideo,
    })
}