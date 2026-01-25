import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useParams } from "react-router-dom";

import { useChannelProfile } from "@/hooks/useChannelProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileStats from "@/components/profile/ProfileStats";

export default function Profile() {
  const { username } = useParams();
  const authUser = useAuthStore((state) => state.user);
  const [ activeTab, setActiveTab ] = useState("videos");

  const profileUsername = username ?? authUser?.username;

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

      <ProfileHeader profile={profile} />

      {/* <ProfileStats channelId={profile._id} /> */}

      <div className="mt-8">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-6">
        <ProfileContent channelId={profile._id} activeTab={activeTab} />
      </div>
    </div>
    </div>
  )
}
