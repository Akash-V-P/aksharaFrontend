import { create } from "zustand";


export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState { 
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) =>
    set({
      user: user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
    }),
}));
