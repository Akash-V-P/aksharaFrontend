import api from "./axios";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  },
  token?: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post<LoginResponse>("/users/login", payload);
  return response.data;
}

export const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
}

export const getCurrentUser = async () => {
  const response = await api.get("/users/current-user");
  return response.data.data;
}