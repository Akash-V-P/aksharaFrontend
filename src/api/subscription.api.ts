import api from "./axios"

export const toggleSubscription = async(channelId: string) => {
    const res = await api.post(`/subscription/c/${channelId}`);
    return res.data;
}

export const getFollowers = async ( channelId: string ) => {
    const res = await api.get(`/subscription/c/getFollowers/${channelId}`);
    return res.data.data;
}

export const getFollowing = async ( channelId: string ) => {
    const res = await api.get(`/subscription/c/getFollowers/${channelId}`);
    return res.data.data;

}