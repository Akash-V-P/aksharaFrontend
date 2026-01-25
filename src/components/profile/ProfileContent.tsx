import { useChannelVideos } from "@/hooks/useChannelVideos";
import { useChannelTweets } from "@/hooks/useChannelTweets";
import { useChannelBooks } from "@/hooks/useChannelBooks";

import {
  VideoGridSkeleton,
  TweetListSkeleton,
  BookGridSkeleton,
} from "@/components/common/ProfileSkeletons";


import { BookOpenText, TvMinimalPlay, MessageSquare  } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import VideoCard from "../video/VideoCard";
import BookCard from "../book/BookCard";


interface ProfileContentProps {
  channelId: string;
  activeTab: string;
}

export default function ProfileContent({
  channelId,
  activeTab,
}: ProfileContentProps) {

  const videosQuery = useChannelVideos(channelId);
  const tweetsQuery = useChannelTweets(channelId);
  const booksQuery = useChannelBooks(channelId);

  const renderVideos = () => {
    if(videosQuery.isLoading) {
      return <VideoGridSkeleton />
    }

    if( !videosQuery.data?.length ) {
      return (
        <EmptyState icon={<TvMinimalPlay size={32}/>} title="No videos yet" description="videos shared by the user will appear here"  />
      )
    }

    return (
      <div className="grid grid-cols-3 gap-4 p-6">
        {videosQuery.data?.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    );
  }

  const renderTweets = () => {
    if(videosQuery.isLoading) {
      return <TweetListSkeleton />;
    }

    if( !videosQuery.data?.length ) {
      return (
        <EmptyState icon={<MessageSquare size={32}/>} title="No Tweets yet" description="Tweet shared by the user will appear here"  />
      )
    }

    return (
      <div className="flex flex-col gap-4 p-6">
        {tweetsQuery.data?.map((tweet: any) => (
          <div
            key={tweet._id}
            className="rounded-md border p-4"
          >
            {tweet.content}
          </div>
        ))}
      </div>
    );
  }

  const renderBooks = () => {
    if(videosQuery.isLoading) {
      return <BookGridSkeleton />;
    }

    if( !videosQuery.data?.length ) {
      return (
        <EmptyState icon={<BookOpenText size={32}/>} title="No Books yet" description="Books shared by the user will appear here"  />
      )
    }

    return (
      <div className="grid grid-cols-4 gap-4 p-6">
        {booksQuery.data?.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    );
  }

  if ( activeTab === "videos" ) return renderVideos();
  if ( activeTab === "tweets" ) return renderTweets();
  if ( activeTab === "books" ) return renderBooks();

  return null;
}
