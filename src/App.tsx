import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Protectedroutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* protected routes */}
          <Route element={<Protectedroutes />}>
            <Route path="/profile" element={<Profile/>} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
