import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx"
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


