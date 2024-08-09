"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { ObjectTypes } from "@/constants/ObjectTypes";
import { cn } from "@/lib/utils";
import { LinkNone1Icon } from "@radix-ui/react-icons";
import {
  Book,
  Bot,
  Code2,
  LucideIcon,
  SquareTerminalIcon,
  Triangle,
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
    subMenus: [],
  },
  {
    title: "Business Partner",
    label: "",
    href: "/businesspartner",
    icon: Book,
    variant: "ghost",
    subMenus: [],
  },
  {
    title: "Sales - A/R",
    label: "",
    href: "#",
    icon: Book,
    variant: "ghost",
    subMenus: [
      {
        title: "Sales Quotation",
        href: `/document/${ObjectTypes.SalesQuotation.name}`,
        icon: Book,
        variant: "ghost",
        label: "",
      },
      {
        title: "Sales Orders",
        href: `/document/${ObjectTypes.SalesOrder.name}`,
        icon: Book,
        variant: "ghost",
        label: "",
      },
    ],
  },
  
  {
    title: "Employee Aging Report",
    label: "",
    href: "/report",
    icon: Book,
    variant: "ghost",
    subMenus: [],
  },
];

export function Nav() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => setIsActive(!isActive);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("");
  const pathname = usePathname();
  return (
    <div
      className="group flex flex-col gap-4 py-2 "
    >
      <nav className="grid gap-2 px-2 mt-2">
        {links.map((link, index) => (
          <>
            {link.subMenus.length > 0 ? (
              <Accordion
                key={index}
                collapsible
                type="single"
                value={activeAccordion}
                onValueChange={(value) => setActiveAccordion(value)}
              >
                <AccordionItem
                  key={index}
                  value={link.title}
                  className="border-b-0 "
                >
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      }),
                      "justify-between dark:text-white hover:no-underline"
                      // link.href && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <div className="ml-1 flex items-center">
                      {link.icon && (
                        <link.icon className="mr-2 h-4 w-4" />
                      )}
                      {!isSidebarCollapsed && <p className="">{link.title}</p>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0 my-1">
                    <div className="ml-7 flex flex-col space-y-1">
                      {link.subMenus.map((subLink, index2) => (
                        <Link
                          key={index2}
                          href={subLink.href}
                          className={cn(
                            buttonVariants({
                              variant:
                                pathname === subLink.href ? "default" : "ghost",
                              size: "default",
                            }),
                            pathname === subLink.href &&
                              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                          )}
                        >
                          <subLink.icon className="mr-2 h-4 w-4" />
                          {subLink.title}
                          {subLink.title && (
                            <span
                              className={cn(
                                "ml-auto",
                                subLink.variant === "default" &&
                                  "text-background dark:text-white"
                              )}
                            >
                              {subLink.label}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: pathname === link.href ? "default" : "ghost",
                    size: "default",
                  }),
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
            )}
          </>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
