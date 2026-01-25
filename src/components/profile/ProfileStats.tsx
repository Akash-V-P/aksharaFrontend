import React from "react";

import { Heart, Eye, Grid3X3 } from "lucide-react";
import { useChannelStats } from "@/hooks/useChannelStats";
import { Skeleton } from "@/components/ui/skeleton";


interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

function StateItem ( { icon, label, value }: StatItemProps ) {
    return (
        <div className="flex item-center gap-2">
            <div className="text-muted-foreground">{icon}</div>
            <div className="text-sm">
                <span className="font-semibold text-foreground">{value}</span>
                <span className="text-muted-foreground">{label}</span>
            </div>
        </div>
    )
}


interface ProfileStatsProps {
  channelId: string;
}

export default function ProfileStats({ channelId }: ProfileStatsProps ) {
    const { data, isLoading } = useChannelStats(channelId);

    if ( isLoading ) {
        return (
            <div className="flex gap-8 px-20 py-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
            </div>
        )
    }

    if ( !data ) return null;

    const totalPosts = data.totalVideos + data.totalBooks + data.totalTweets;

    return (
        <div className="flex gap-10 px-20 py-4">
            <StateItem 
                icon={<Grid3X3 size={16} />}
                label="posts"
                value={totalPosts}            
            />
       
            <StateItem 
                icon={<Grid3X3 size={16} />}
                label="views"
                value={data.channelTotalViews}            
            />
        
            <StateItem 
                icon={<Grid3X3 size={16} />}
                label="likes"
                value={data.channelTotalLikes}            
            />
        </div>
    )
}
