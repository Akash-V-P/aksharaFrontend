import type { ChannelProfile } from "@/api/user.api";
import { useToggleSubscription } from "@/hooks/useToggleSubscription";
import { Button } from "../ui/button";

interface FollowButtonProps {
  profile: ChannelProfile;
}

export default function FollowButton({ profile }: FollowButtonProps) {
  const toggleSubs = useToggleSubscription();

  const handleClick = () => {
    toggleSubs.mutate(profile._id);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={toggleSubs.isPending}
      variant={profile.isSubscribed ? "secondary" : "default"}
    >
      {toggleSubs.isPending
        ? "Please wait...."
        : profile.isSubscribed
          ? "Following"
          : "Follow"}
    </Button>
  );
}
