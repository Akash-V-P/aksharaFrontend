import api from "./axios";

import type { UploadProgressCallback } from "@/types/upload";

export interface UploadVideoPlayload {
    title: string;
    description: string;
    thumbnail: File;
    videoFile: File;
    
}

export const uploadVideo = async ( playload: UploadVideoPlayload, onProgress?: UploadProgressCallback ) => {
    const formData = new FormData();

    formData.append("title", playload.title);
    formData.append("description", playload.description);
    formData.append("thumbnail", playload.thumbnail);
    formData.append("videoFile", playload.videoFile);

    const response = await api.post(
        "/video/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
                if(!event.total) return;
                const percent = Math.round((event.loaded*100) / event.total);
                onProgress?.(percent);
            },
        }
    );

    return response.data;

}