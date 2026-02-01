import { useFollowers } from "@/hooks/useFollowers"
import FollowListItem from "./FollowListItem";
import type { publicUser } from "@/types/user";

interface FollowerListProps {
    channelId: string,
}


export default function FollowerList( { channelId }: FollowerListProps ) {
    const { data, isLoading, isError } = useFollowers( channelId );

    if ( isLoading ) {
        return <div className="p-4 text-sm text-muted-foreground">Loading followers....</div>
    }

    if ( isError ) {
        return <div className="p-4 text-sm text-muted-foreground">Failed to load followers</div>
    }

    if ( !data || !data.length ) {
        return(
        <p className="p-4 text-sm text-muted-foreground text-center">No followers yet</p>
    )
    }

    return (
        <div className=" flex flex-col gap-2" >
            {
                data.map( (follower: publicUser) => (<FollowListItem key={follower._id} user={follower}/>) )
            }
        </div>
    )
}