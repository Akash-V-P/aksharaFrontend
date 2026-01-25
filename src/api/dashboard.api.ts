import api from "./axios";

export const getChannelBooks = async (channelId: string) => {
    const res = await api.get(`/dashboard/books/${channelId}`);
    return res.data.data;
}

export const getChannelVideos = async (channelId: string) => {
    const res = await api.get(`/dashboard/videos/${channelId}`);
    return res.data.data;
}

export const getChannelTweets = async (channelId: string) => {
    const res = await api.get(`/dashboard/tweets/${channelId}`);
    return res.data.data;
}

export const getChannelStats = async (channelId: string) => {
    const res = await api.get(`/dashboard/stats/${channelId}`);
    return res.data.data;
}
