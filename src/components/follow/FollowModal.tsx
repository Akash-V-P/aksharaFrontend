import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingList from "./FollowingList";
import FollowerList from "./FollowerList";

interface FollowModalProps {
  channelId: string;
  activeTab: "followers" | "following";
  setActiveTab: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowModal({
  channelId,
  open,
  activeTab,
  setActiveTab,
  onOpenChange,
}: FollowModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="max-h-[400px] overflow-y-auto">
            <FollowerList channelId={channelId} />
          </TabsContent>
          <TabsContent value="following" className="max-h-[400px] overflow-y-auto">
            <FollowingList userId={channelId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
