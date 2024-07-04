import { LifeBuoy, SquareUser, Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Nav from "./Nav";
import { SidebarMenus } from "@/constants/SidebarMenus";
import { Separator } from "@/components/ui/separator";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r lg:w-[220px]">
      <div className="flex items-center border-b p-2 gap-3">
        <div>
          <Button variant="outline" size="icon" aria-label="PlayGround">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <div className="hidden lg:flex">
          <Link href="/dashboard">
            <span className="font-bold text-xl">PlayGround</span>
          </Link>
        </div>
      </div>
      {/* this nav is for large  view */}
      <div className="hidden lg:grid">
        <Nav/>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
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
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
