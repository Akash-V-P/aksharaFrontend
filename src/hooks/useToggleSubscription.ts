import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toggleSubscription} from "@/api/subscription.api"
import type { ChannelProfile } from "@/api/user.api";

export const useToggleSubscription = ( profileId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => toggleSubscription(profileId),
        
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ["channel-profile", profileId]
            });

            const previousProfile = queryClient.getQueryData<ChannelProfile>(["channel-profile", profileId]);

            if (previousProfile) {
                queryClient.setQueryData<ChannelProfile>(["channel-profile", profileId], 
                    {
                        ...previousProfile,
                        isSubscribed: !previousProfile.isSubscribed,
                        subscribersCount: previousProfile.isSubscribed ? previousProfile.subscribersCount - 1 : previousProfile.subscribersCount + 1,
                    }
                );
            }

            return { previousProfile };
        },

        onError: (_err, _var, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(
                    ["channel-profile", profileId],
                    context.previousProfile
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["channel-profile", profileId]
            })
        }
    })
}