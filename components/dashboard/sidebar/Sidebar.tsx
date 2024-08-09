"use client";
import { LifeBuoy, LogOutIcon, SquareUser, Triangle } from "lucide-react";

import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarMenus } from "@/constants/SidebarMenus";
import Link from "next/link";
import Nav from "./Nav";
import Avatar from "./avatar";
import NewNav from "./newnav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r lg:w-[220px]">
      <div className="flex items-center border-b p-2 gap-3">
        <div>
          <Button variant="outline" size="icon" aria-label="SAP Portal">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <div className="hidden lg:flex">
          <Link href="/dashboard">
            <span className="font-bold text-xl">SAP Portal </span>
          </Link>
        </div>
      </div>
      {/* this nav is for large  view */}
      <div className="hidden lg:grid">
        <Nav />
      </div>
      {/* this nav is for small view */}
      <nav className="lg:hidden grid gap-3 p-2">
        <TooltipProvider>
          {SidebarMenus?.map((menu) => (
            <Tooltip key={menu.title}>
              <TooltipTrigger asChild>
                <Link href={menu.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label={menu.title}
                  >
                    <menu.icon className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {menu.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <nav className="mt-auto grid gap-1 p-2">
        <Separator />
        <TooltipProvider>
          <div className="flex flex-col gap-3  mt-2">
            <AlertDialog>
              <AlertDialogTrigger
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "justify-start cursor-pointer text-red-500"
                )}
              >
                <LogOutIcon
                  className="mr-2 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                Sign Out
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign Out</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to sign out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    // onClick={() => auth.signOut()}
                    className={cn(
                      buttonVariants({
                        variant: "destructive",
                      })
                    )}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
