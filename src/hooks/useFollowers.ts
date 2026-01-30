import { getFollowers } from "@/api/subscription.api"
import { useQuery } from "@tanstack/react-query"

export const useFollowers = ( channelId: string ) => {
    return useQuery({
        queryKey: [ "channel-followers", channelId ],
        queryFn: () => getFollowers(channelId),
        enabled: !!channelId,
    })
}