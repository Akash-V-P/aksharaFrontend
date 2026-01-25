import { getChannelTweets } from "@/api/dashboard.api"
import { useQuery } from "@tanstack/react-query"

export const useChannelTweets = ( channelId: string ) => {
    return useQuery({
        queryKey: ["channel-tweets", channelId ],
        queryFn: () => getChannelTweets(channelId),
        enabled: !!channelId,
    })
}