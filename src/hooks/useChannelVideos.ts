import { useQuery } from "@tanstack/react-query";
import { getChannelVideos } from "@/api/dashboard.api";

export const useChannelVideos = ( channelId: string ) => {
    return useQuery ({
        queryKey: ["channel-videos", channelId],
        queryFn: () => getChannelVideos( channelId ),
        enabled: !!channelId,
    })
}