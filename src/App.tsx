import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Protectedroutes from "@/routes/ProtectedRoutes";
import NotFound from "@/pages/NotFound";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

import PublicLayout from "@/layout/publicLayout";
import AppLayout from "@/layout/AppLayout";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if ( isAuthLoading ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading....</p>
      </div>
    )
  }
  
  return (
    <BrowserRouter>
      <Routes>

        {/* public routes */}
        <Route element={ <PublicLayout /> }>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
        </Route>

        {/* protected routes */}
        <Route element={ <Protectedroutes /> }>
          <Route element={ <AppLayout />} >
            <Route path="/profile" element={ <Profile /> } />
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path="*" element={ <NotFound /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
