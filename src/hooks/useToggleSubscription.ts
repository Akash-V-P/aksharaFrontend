import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toggleSubscription} from "@/api/subscription.api"

export const useToggleSubscription = (username: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleSubscription,
        onSuccess: () => {
            // refetch profile after follow/unfollow
            queryClient.invalidateQueries({
                queryKey: ["channel-profile"],
            })
        }
    })
}