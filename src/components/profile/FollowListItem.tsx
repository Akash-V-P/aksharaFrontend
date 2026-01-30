import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface FollowListItemProps {
  user: {
    username: string;
    fullName: string;
    avatar: string;
  };
}

export default function FollowListItem({ user }: FollowListItemProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/profile/${user.username}`);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="flex cursor-pointer items-center gap-4 py-2 hover:bg-muted focus:bg-muted focus:outline-none"
    >
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.username}</span>
        <span className="text-xs text-muted-foreground">{user.fullName}</span>
      </div>
    </div>
  );
}
