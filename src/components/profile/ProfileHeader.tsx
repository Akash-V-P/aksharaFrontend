import { useAuthStore } from "@/store/auth.store";
import type { ChannelProfile } from "@/api/user.api";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PenSquare } from "lucide-react";
import FollowButton from "./FollowButton";


interface ProfileHeaderProps {
  profile: ChannelProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const authUser = useAuthStore((state) => state.user);
  const isOwnProfile = authUser?.username === profile.username;

  return (
    <div className="pb-10 pl-20 pt-5">
      <div className="flex items-start gap-10">
        {/* avatar */}
        <Avatar className="h-36 w-36">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback className="text-3xl">
            {profile.username[0]}
          </AvatarFallback>
        </Avatar>

        {/* right side */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-6">
              {/* username */}
              <h2 className="text-4xl font-semibold">{profile.username}</h2>

              {/* edit profile */}
              {isOwnProfile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="flex items-center justify-center"
                    >
                      <PenSquare size={20} />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="rounded-md bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-md backdrop-blur">
                    Edit profile
                  </TooltipContent>
                </Tooltip>
              ) : (
                <FollowButton profile={profile} />
              )}
            </div>

            {/* Full name */}
            <div className="text-xl">
              <p className="font-medium">{profile.fullName}</p>
            </div>
          </div>

          <div className="flex gap-8">
            {/* stats */}
            <div className="flex gap-8 text-xl">
              <div>
                <span className="font-semibold">
                  {profile.subscribersCount}
                </span>{" "}
                followers
              </div>
            </div>
            <div className="flex gap-8 text-xl">
              <div>
                <span className="font-semibold">
                  {profile.channelsSubscribedToCount}
                </span>{" "}
                following
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
