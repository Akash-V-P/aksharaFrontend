import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toggleSubscription} from "@/api/subscription.api"

export const useToggleSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSubscription,
        
        onSuccess: ( _, profileId) => {
            queryClient.invalidateQueries({
                queryKey: ["channel-profile", profileId],
            })
        }
    })
}