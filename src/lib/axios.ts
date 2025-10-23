import axios from 'axios';
import { msalInstance } from "@/lib/msal-instance";
import { loginRequest } from "@/auth/auth-config";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const account = msalInstance.getActiveAccount();
  if (!account) return config;

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    config.headers.Authorization = `Bearer ${response.accessToken}`;
  } catch (error) {
    console.error("Token acquisition failed:", error);
  }

  return config;
});
