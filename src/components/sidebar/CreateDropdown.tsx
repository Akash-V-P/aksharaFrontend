import { useNavigate } from "react-router-dom";
import { Plus, TvMinimalPlay, BookOpenText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function CreateDropdown() {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 border"
                >
                    <Plus size={20} />
                    <span className="text-lg px-4">Create</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="right"
                align="start"
                className="w-48"
            >
                <DropdownMenuItem 
                    onClick={() => navigate("/upload/video")}
                >
                    <TvMinimalPlay size={16} />
                    Upload Video
                </DropdownMenuItem>

                <DropdownMenuItem 
                    onClick={() => navigate("/upload/book")}
                >
                    <BookOpenText size={16} />
                    Upload Book
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>    
    );

}