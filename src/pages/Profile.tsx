import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useParams } from "react-router-dom";

import { useChannelProfile } from "@/hooks/useChannelProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileStats from "@/components/profile/ProfileStats";
import FollowModal from "@/components/follow/FollowModal";

export default function Profile() {
  const { username } = useParams();
  const authUser = useAuthStore((state) => state.user);
  const [ activeTab, setActiveTab ] = useState("videos");

  const [ isFollowModalOpen, setIsFollowModalOpen ] = useState(false);
  const [ activeFollowTab, setActiveFollowtab] = useState<"followers" | "following">("followers");

  const profileUsername = username ?? authUser?.username;

  const openFollowers = () => {
    setActiveFollowtab("followers");
    setIsFollowModalOpen(true);
  }

  const openFollowing = () => {
    setActiveFollowtab("following");
    setIsFollowModalOpen(true);
  }


  const { 
    data: profile,
    isLoading,
    isError
   } = useChannelProfile(profileUsername!);

  if( isLoading ) {
    return <div className="p-6">Loading Profile....</div>
  }

  if( !profile || isError ) {
    return <div className="p-6">Profile not found</div>
  }

  return(
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-6">

      <ProfileHeader profile={profile} onFollowersClick={openFollowers} onFollowingClick={openFollowing} />

      {/* <ProfileStats channelId={profile._id} /> */}

      <div className="mt-8">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-6">
        <ProfileContent channelId={profile._id} activeTab={activeTab} />
      </div>

      <FollowModal
        open={isFollowModalOpen}
        onOpenChange={setIsFollowModalOpen}
        activeTab={activeFollowTab}
        setActiveTab={(value) => {
          if ( value === "followers" || value === "following"){
            setActiveFollowtab(value);
          }
        }}
        channelId={profile._id}
      />
    </div>
    </div>
  )
}
