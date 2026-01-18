import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/Navbar.tsx";

export default function AppLayout () {
    return (
        <div className="min-h-screen">
            <Navbar/>

            <main className="pt-16">
                <Outlet/>
            </main>
        </div>
    )
}