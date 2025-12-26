import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx"
import { useAuthStore } from "@/store/auth.store.ts"


export default function MainLayout() {
    const { user, isAuthenticated, login, logout } = useAuthStore();

    return(
        <div>
            <nav className=" flex items-center gap-4 p-4 border-b">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>

                { isAuthenticated &&
                    <>
                        <span className="text-sm">Hello, {user?.name}</span>
                        <Button size="sm" onClick={logout}>Logout</Button>
                    </>
                }
            </nav>

            <main className="p-6">
                <Outlet/>
            </main>
        </div>
    );
}