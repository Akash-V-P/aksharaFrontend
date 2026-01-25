import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar.tsx";

export default function AppLayout () {
    return (
        <div className="ml-64 min-h-screen flex-1 bg-background">
            <Sidebar/>

            <main className="pt-16">
                <Outlet/>
            </main>
        </div>
    )
}