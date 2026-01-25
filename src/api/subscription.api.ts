import api from "./axios"

export const toggleSubscription = async(channelId: string) => {
    const res = await api.post(`/subscription/c/${channelId}`);
    return res.data;
}