import { useChannelVideos } from "@/hooks/useChannelVideos";
import { useChannelTweets } from "@/hooks/useChannelTweets";
import { useChannelBooks } from "@/hooks/useChannelBooks";

interface ProfileContentProps {
  channelId: string;
  activeTab: string;
}

export default function ProfileContent({
  channelId,
  activeTab,
}: ProfileContentProps) {
  if (activeTab === "videos") {
    const { data, isLoading } = useChannelVideos(channelId);

    if (isLoading) return <p className="p-6">Loading videos…</p>;
    if (!data?.length) return <p className="p-6">No videos yet</p>;

    return (
      <div className="grid grid-cols-3 gap-4 p-6">
        {data.map((video: any) => (
          <div key={video._id} className="aspect-square bg-muted rounded-md" />
        ))}
      </div>
    );
  }

  if (activeTab === "tweets") {
    const { data, isLoading } = useChannelTweets(channelId);

    if (isLoading) return <p className="p-6">Loading tweets…</p>;
    if (!data?.length) return <p className="p-6">No tweets yet</p>;

    return (
      <div className="flex flex-col gap-4 p-6">
        {data.map((tweet: any) => (
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

  if (activeTab === "books") {
    const { data, isLoading } = useChannelBooks(channelId);

    if (isLoading) return <p className="p-6">Loading books…</p>;
    if (!data?.length) return <p className="p-6">No books yet</p>;

    return (
      <div className="grid grid-cols-4 gap-4 p-6">
        {data.map((book: any) => (
          <div
            key={book._id}
            className="aspect-[3/4] rounded-md bg-muted"
          />
        ))}
      </div>
    );
  }

  return null;
}
