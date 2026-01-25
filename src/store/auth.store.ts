import { getCurrentUser, loginUser, logoutUser } from "@/api/auth.api";
import { registerAuthLogoutHandler } from "@/api/authEvents";
import { create } from "zustand";


export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage?: string;
}

interface AuthState { 
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  login: async (email, password) => {
    const data = await loginUser({ email, password });

    set({
      user: data.user,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (error) { /* empty */ }

    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    try {
      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isAuthLoading: false,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isAuthLoading: false,
      });
    }
  },
    
}));

//this fun registers the logut if the refreshing of access token fails
registerAuthLogoutHandler(() => {
      useAuthStore.getState().logout();
    })