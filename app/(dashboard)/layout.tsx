import { auth } from "@/auth";
import Header from "@/components/dashboard/header/Header";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import axiosInstance from "@/lib/axiosInstance";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await auth();
  const data = await axiosInstance.get("https://localhost:7092/WeatherForecast");
  console.log(data.data, "data.data");
  return (
    <>
      <SessionProvider session={session}>
        <div className="grid h-screen w-full pl-[56px] lg:pl-[220px]">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
              {children}
            </main>
          </div>
        </div>
      </SessionProvider>
    </>
  );
};

export default DashboardLayout;
