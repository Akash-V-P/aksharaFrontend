import type { AxiosError } from "axios";

export type ApiError = {
    message: string;
    status?: number;
}

export const normalizeApiError = (error: unknown): ApiError => {
    if ((error as AxiosError).isAxiosError) {
        const AxiosError = error as AxiosError<any>;

        return{
            message:
                AxiosError.response?.data?.message ||
                AxiosError.response?.data?.error ||
                "something went wrong",
            status: AxiosError.response?.status,
        };
    }

    if (error instanceof Error) {
        return { message: error.message };
    }

    return { message: "Unexpected error occoured" };
}