"use client"
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Book,
  Bot,
  Code2, LucideIcon, SquareTerminalIcon, Triangle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    href: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}
const links = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: Triangle,
    variant: "default",
  },
  {
    title: "Projects",
    label: "",
    href: "/projects",
    icon: Book,
    variant: "ghost",
  },
  {
    title: "Terminal",
    label: "",
    href : "/terminal",
    icon: SquareTerminalIcon,
    variant: "ghost",
  },
  {
    title: "Code",
    label: "",
    href : "/code",
    icon: Code2,
    variant: "ghost",
  },
  {
    title: "Chat",
    label: "",
    href : "/chat",
    icon: Bot,
    variant: "ghost",
  },
];

//export function Nav({ links, isCollapsed }: NavProps) {
export function Nav() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const toggleActive = () => setIsActive(!isActive)
  const pathname = usePathname()
  //const isActive = pathname.includes("Dashboard")
  return (
    <div
      //data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 "
    >
      <nav className="grid gap-2 px-2 mt-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              buttonVariants({ variant: pathname === link.href ? "default" : "ghost", size: "default" }),
              pathname === link.href &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
