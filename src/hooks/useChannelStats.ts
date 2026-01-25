import { getChannelStats } from "@/api/dashboard.api"
import { useQuery } from "@tanstack/react-query"

export const useChannelStats = ( channelId: string ) => {
    return useQuery({
        queryKey: ["channel-stats", channelId],
        queryFn: () => getChannelStats(channelId),
        enabled: !!channelId,
    })
}