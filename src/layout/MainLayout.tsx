import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

export default function MainLayout() {
    return(
        <div>
            <nav className=" flex items-center gap-4 p-4 border-b">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">
                    <Button size="sm" >Login</Button>
                </Link>
            </nav>

            <main className="p-6">
                <Outlet/>
            </main>
        </div>
    );
}