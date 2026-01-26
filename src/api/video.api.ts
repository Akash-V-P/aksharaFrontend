import api from "./axios";

export interface UploadVideoPlayload {
    title: string;
    description: string;
    thumbnail: File;
    videoFile: File;
}

export const uploadVideo = async ( playload: UploadVideoPlayload ) => {
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
            }
        }
    );

    return response.data;

}