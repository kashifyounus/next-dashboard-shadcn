import { auth } from "@/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.WEBAPI_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await get_session();
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

async function get_session() {
  if (typeof window !== "undefined") {
    //client side
    const session = await getSession();
    return session;
  } else {
    //server side
    const session = await auth();
    return session;
  }
}
