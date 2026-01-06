import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Protectedroutes from "./routes/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layout/AuthLayout";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />

          {/* protected routes */}
          <Route element={<Protectedroutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
