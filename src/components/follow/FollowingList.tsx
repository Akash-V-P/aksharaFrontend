import { useFollowing } from "@/hooks/useFollowing";
import FollowListItem from "./FollowListItem";
import type { publicUser } from "@/types/user";

interface FollowingListProps {
  userId: string;
}

export default function FollowingList( { userId }: FollowingListProps) {
  const { data, isLoading, isError } = useFollowing(userId);

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading following....
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Failed to load following
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        No following yet
      </p>
    );
  }

  return (
    <div>
      {data.map((following: publicUser) => (
        <FollowListItem key={following._id} user={following} />
      ))}
    </div>
  );
}
