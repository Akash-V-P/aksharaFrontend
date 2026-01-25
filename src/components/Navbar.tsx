import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* logo */}
        <Link to={"/"} className="text-lg font-bold">
          AKSHARA
        </Link>

        {/* profile/signIn/signUp */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          ) : (
            isAuthenticated &&
            user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" >
                  <DropdownMenuItem asChild>
                    <Link to="/profile"> Profile </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
