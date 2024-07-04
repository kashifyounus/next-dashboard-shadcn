import { buttonVariants } from "@/components/ui/button";
import {
  Book,
  Bot,
  Code2,
  LucideIcon,
  SquareTerminalIcon,
  Triangle,
} from "lucide-react";

export const SidebarMenus  = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Triangle,
    variant: "default",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Book,
    variant: "ghost",
  },
  {
    title: "Terminal",
    href : "/terminal",
    icon: SquareTerminalIcon,
    variant: "ghost",
  },
  {
    title: "Code",
    href : "/code",
    icon: Code2,
    variant: "ghost",
  },
  {
    title: "Chat",
    href : "/chat",
    icon: Bot,
    variant: "ghost",
  },
];
