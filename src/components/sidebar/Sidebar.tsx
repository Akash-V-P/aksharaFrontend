import { useAuthStore } from "@/store/auth.store";
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Home } from "lucide-react";


export default function Sidebar() {
    const user = useAuthStore((state) => state.user);

    return (
        <aside className="fixed left-0 top-0 h-screen w-48 border-r bg-background px-4 py-6">
            {/* logo */}
            <NavLink to={"/"} className="mb-8 pl-4 text-2xl font-bold" >Akshara</NavLink>

            {/* navigation */}
            <nav className=" flex flex-col gap-2 pt-8">
                <SidebarItem to="/home" icon={<Home size={20}/>} label={"Home"} />
            </nav>


            {/* profile */}
            <SidebarItem 
                to={`/profile/${user?.username}`}
                icon={
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                }
                label="Profile"
            />

        </aside>
    )
}