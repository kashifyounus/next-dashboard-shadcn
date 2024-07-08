"use client";
import { DemoCreateAccount } from "@/components/cards/components/create-account";
import axiosInstance from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  //const data = await axiosInstance.get("https://localhost:7092/WeatherForecast");
  //console.log(data.data, "data.data");
  //const {data: session} = useSession();
  useEffect(() => {
    //console.log(session,'session')
    const fetchData = async () => {
      const data = await axiosInstance
        .get("https://localhost:7092/WeatherForecast")
        .then((res) => {
          console.log(res);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className={cn("flex items-center justify-center [&>div]:w-full")}>
        <DemoCreateAccount />
        {/* {session?.user?.email} */}
      </div>
    </div>
  );
}
