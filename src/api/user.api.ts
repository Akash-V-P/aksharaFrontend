import api from "./axios";

export interface ChannelProfile {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    avatar: string;
    subscribersCount: number;
    channelsSubscribedToCount: number;
    isSubscribed: boolean;
}

export const getChannelProfile = async ( username: string ): Promise< ChannelProfile > => {
    const res = await api.get(`/users/c/${username}`);
    return res.data.data;
}