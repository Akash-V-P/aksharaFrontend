import { useQuery } from "@tanstack/react-query";
import { getChannelProfile } from "@/api/user.api";

export const useChannelProfile = ( username: string ) => {
    return useQuery ({
        queryKey: ["channel-profile", username],
        queryFn: () => getChannelProfile(username),
        enabled: !!username,
    })
}