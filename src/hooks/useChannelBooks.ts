import { getChannelBooks } from "@/api/dashboard.api"
import { useQuery } from "@tanstack/react-query"

export const useChannelBooks = ( channelId: string ) => {
    return useQuery({
        queryKey: ["channel-videos", channelId],
        queryFn: () => getChannelBooks(channelId),
        enabled: !!channelId,
    })
}