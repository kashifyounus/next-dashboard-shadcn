"use client";
import CardsPage from "@/components/cards/CardsPage";
import { DemoCreateAccount } from "@/components/cards/components/create-account";
import axiosInstance from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  //const {data: session} = useSession();

  useEffect(() => {
    //console.log(session,'session')
    const fetchData = async () => {
      const data = await axiosInstance
        .get("/WeatherForecast")
        .then((res) => {
          console.log(res);
        });
    };
    //fetchData();
  }, []);
  return (
    <div className="">
      <div className={cn("flex items-center justify-center [&>div]:w-full")}>
        <DemoCreateAccount />
      </div>
    </div>
  );
}
