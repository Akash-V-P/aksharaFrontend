import api from "./axios";

export interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverimage?: string;
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/users/login", payload, {
    skipAuthRefresh: true, 
  });
  
  return response.data.data;
}

export const logoutUser = async () => {
  const response = await api.post("/users/logout", null, {
    skipAuthRefresh: true,
  });
  return response.data;
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get("/users/current-user");
  return response.data.data;
}