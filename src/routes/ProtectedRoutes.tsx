import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export default function Protectedroutes() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);

    if(isLoading) {
        return <div>Loading...</div>;
    }   

    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet />;
}