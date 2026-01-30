import { getFollowing } from "@/api/subscription.api"
import { useQuery } from "@tanstack/react-query"

export const useFollowing = ( channelId: string ) => {
    return useQuery({
        queryKey: [ "channel-following", channelId ],
        queryFn: () => getFollowing(channelId),
        enabled: !!channelId,
    })
}