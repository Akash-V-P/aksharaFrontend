import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpenText, TvMinimalPlay, EthernetPort } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="flex w-full justify-center gap-10 border-b bg-transparent p-0">

        {/* books */}
        <TabsTrigger
          value="books"
          className="rounded-none border-b-2 border-transparent px-2 pb-3 text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <BookOpenText size={20} />
              </span>
            </TooltipTrigger>

            <TooltipContent className="rounded-md bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-md backdrop-blur">
              Books
            </TooltipContent>
          </Tooltip>
        </TabsTrigger>

        {/* vidoes */}
        <TabsTrigger
          value="videos"
          className="rounded-none border-b-2 border-transparent px-2 pb-3 text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <TvMinimalPlay size={20} />
              </span>
            </TooltipTrigger>

            <TooltipContent className="rounded-md bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-md backdrop-blur">
              Videos
            </TooltipContent>
          </Tooltip>
        </TabsTrigger>

        {/* tweets */}
        <TabsTrigger
          value="tweets"
          className="rounded-none border-b-2 border-transparent px-2 pb-3 text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <EthernetPort size={20} />
              </span>
            </TooltipTrigger>

            <TooltipContent className="rounded-md bg-background/80 px-3 py-1.5 text-xs text-foreground shadow-md backdrop-blur">
              Tweets
            </TooltipContent>
          </Tooltip>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
