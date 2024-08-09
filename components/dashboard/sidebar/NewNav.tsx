import React, { useEffect, useState } from "react";
//import LogoImage from "../assets/Logo_2.png";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { buttonVariants } from "@/components/ui/button";
import {
  BellIcon,
  BookCheck,
  ChevronLeft,
  ChevronRight,
  FileBarChart2,
  LayoutDashboardIcon,
  LogOut,
  LogOutIcon,
  Menu,
  MessageSquare,
  MoreVertical,
  Settings,
} from "lucide-react";
//import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//import useLocalStorage from "../hooks/useLocalStorage";
import { Toaster } from "sonner";
//import { getUserProfile } from "../lib/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
//import { useAuth } from "../providers/AuthProvider";


function NewNav() {
  //const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [signOutAlert, setSignOutAlert] = useState(false);
  //const [values, setValues, removeKeys] = useLocalStorage({});
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [activeAccordion, setActiveAccordion] = useState("");

  //const navigate = useNavigate();

  const navItems = [
    {
      title: "Discover",
      to: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Ticketing",
      href: "/",
      icon: BookCheck,
      children: [
        // ...(user?.role !== 'AGT' ? [{ title: "Create Ticket", to: "/create-ticket", icon: FileBarChart2 }] : []),
        { title: "Ticket Status", to: "/ticket-status", icon: FileBarChart2 },
        { title: "Ticket Interaction", to: "/ticket-chat", icon: MessageSquare },
      ],
    },
    {
      title: "Notification",
      to: "/notification",
      icon: BellIcon,
    },
    {
      title: "Speak Up",
      to: "/speak-up",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Feedback",
      to: "/feedback",
      icon: LayoutDashboardIcon,
    },
    {
      title: "FAQs",
      to: "/faq",
      icon: LayoutDashboardIcon,
    },
    // {
    //   title: "Profile",
    //   href: "/",
    //   icon: BookCheck,
    //   children: [
    //     { title: "Personal Profile", to: "/create-ticket", icon: FileBarChart2 },
    //     {
    //       title: "Help us know you better",
    //       to: "/ticket-status",
    //       icon: FileBarChart2,
    //     },
    //     { title: "Change Password", to: "/ticket-chat", icon: MessageSquare },
    //   ],
    // },
    {
      title: "Account Settings",
      to: "/settings",
      icon: Settings,
    },
  ];
  

  const handleSignOut = () => {
    // Remove keys from localStorage
    removeKeys(["password", "username", "companyCode", "projectid", "custno", "accessToken"]);
    navigate("/login", { replace: true });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const compco = user.companyCode;
      const userid = user.username;
      console.log(userid);
      const result = await getUserProfile(compco, userid);
      setProfileData(result);
      console.log(profileData);
      setFname(result.firstname);
      setLname(result.lastname);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch ticket types or priorities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    let initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
      initials += nameParts[1].charAt(0).toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    //fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Desktop and Laptop Sidebar */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-16" : "w-80"
          } hidden h-screen flex-col border-r-2 md:flex transition-width duration-200 ease-in-out bg-darkblue`}
        >
          <TooltipProvider>
            <div
              className={`flex items-center bg-darkblue ${
                isSidebarCollapsed ? "justify-center" : "justify-between"
              } p-3`}
            >
              <div className="flex items-center">
                {!isSidebarCollapsed && (
                  <>
                    {/* <img
                      src={LogoImage}
                      alt="logo"
                      height="40px"
                      width="40px"
                      className="rounded-lg bg-white p-1"
                    />
                    <p className="ml-2 text-xl font-semibold text-white">
                      ERTickApp
                    </p> */}
                  </>
                )}
              </div>
              <button
                className=" ml-0 text-white focus:outline-none p-1 rounded-lg bg-gray-600 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>
            </div>
            <Separator className="bg-slate-700 mb-4" />
            {navItems.length > 0 && (
              <nav className="flex flex-col gap-1 m-1">
                {navItems.map((item, index) =>
                  item.children ? (
                    !isSidebarCollapsed ? (
                      <Accordion
                        key={index}
                        type="single"
                        collapsible
                        value={activeAccordion}
                        onValueChange={(value) => setActiveAccordion(value)}
                      >
                        <AccordionItem
                          value={item.title}
                          className="border-b-0"
                        >
                          <AccordionTrigger
                            className={cn(
                              buttonVariants({
                                size: "sm",
                                variant: "ghost",
                              }),
                              "justify-between text-white",
                              item.disabled && "cursor-not-allowed opacity-80"
                            )}
                          >
                            <div className="flex items-center">
                              {item.icon && (
                                <item.icon className="mr-2 h-4 w-4 shrink-0" />
                              )}
                              {!isSidebarCollapsed && <p>{item.title}</p>}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="p-0 my-1">
                            <div className="ml-7 flex flex-col space-y-1">
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.to}
                                  className={({ isActive }) =>
                                    cn(
                                      buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                      }),
                                      "justify-start text-white",
                                      isActive &&
                                        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-muted", // Active link style
                                      child.disabled &&
                                        "cursor-not-allowed opacity-80"
                                    )
                                  }
                                >
                                  {child.icon && (
                                    <child.icon className="mr-2 h-4 w-4 shrink-0" />
                                  )}
                                  {!isSidebarCollapsed && child.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      // Render flat links with tooltip when sidebar is collapsed
                      item.children.map((child, childIndex) => (
                        <Tooltip key={childIndex}>
                          <TooltipTrigger>
                            <Link
                              href={child.to}
                              className={({ isActive }) =>
                                cn(
                                  buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                  }),
                                  "justify-start text-white",
                                  isActive &&
                                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-muted",
                                  child.disabled &&
                                    "cursor-not-allowed opacity-80"
                                )
                              }
                            >
                              {child.icon && (
                                <child.icon
                                  className="mr-2 h-4 w-4 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="ml-1 bg-slate-900 border-slate-900 text-white"
                          >
                            {child.title}
                          </TooltipContent>
                        </Tooltip>
                      ))
                    )
                  ) : isSidebarCollapsed ? (
                    // Render flat links with tooltip when sidebar is collapsed
                    <Tooltip key={index}>
                      <TooltipTrigger className="p-0">
                        <Link
                          href={"/"}
                          to={item.to}
                          className={({ isActive }) =>
                            cn(
                              buttonVariants({
                                size: "sm",
                                variant: "ghost",
                              }),
                              " text-white",
                              isActive &&
                                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-muted",
                              item.disabled && "cursor-not-allowed opacity-80"
                            )
                          }
                        >
                          {item.icon && (
                            <item.icon
                              className="mr-2 h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="ml-1 bg-slate-900 border-slate-900 text-white"
                      >
                        {/* <TooltipArrow /> */}
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    // Render flat links without tooltip when sidebar is not collapsed
                    <Link
                      href="/"
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          buttonVariants({
                            size: "sm",
                            variant: "ghost",
                          }),
                          " text-white justify-normal",
                          isActive &&
                             "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-muted",
                            item.disabled &&
                            "cursor-not-allowed opacity-80"
                        )
                      }
                    >
                      {item.icon && (
                        <item.icon
                          className="mr-2 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      {!isSidebarCollapsed && item.title}
                    </Link>
                  )
                )}
              </nav>
            )}
            <div className="mt-auto">
              <Separator className="bg-slate-700" />
              <div className="flex p-2.5 mt-1">
                <span
                  className="flex justify-center items-center bg-blue-300 text-blue-900 rounded-full h-9 w-9">
                  {getInitials(fname + " " + lname)}
                </span>
                <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${
                    isSidebarCollapsed ? "w-0" : "w-52 ml-3"
                  } `}
                >
                  <div className="leading-4">
                    <h4
                      className={`font-semibold text-white ${
                        isSidebarCollapsed ? "hidden" : "flex"
                      }`}
                    >
                      {fname + " " + lname}
                    </h4>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical size={20} color="#fff" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-700 text-white border-slate-900"
                    >
                      <DropdownMenuItem
                        onSelect={() => setSignOutAlert(true)}
                        className="focus:bg-primary focus:text-white"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialog
                    open={signOutAlert}
                    onOpenChange={setSignOutAlert}
                  >
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
                          onClick={handleSignOut}
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
              </div>
            </div>
          </TooltipProvider>
        </aside>
        {/* Mobile Navbar */}
        <div className="md:hidden flex flex-col justify-center mt-auto bg-darkblue">
          <div className="flex flex-row items-center gap-2 m-2">
            <Sheet>
              <SheetTrigger asChild>
                <Menu size={22} color="#fff" className="justify-start" />
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <div className="flex flex-row items-center">
                  {/* <img
                    src={LogoImage}
                    alt="logo"
                    height="35px"
                    width="35px"
                    className="rounded-lg my-4 mt-6 ml-[-10px]"
                  />
                  <p className="text-base text-black font-semibold ml-2 mt-2">
                    ERTickApp
                  </p> */}
                </div>
                {navItems.length > 0 && (
                  <nav className="flex flex-col gap-3 ml-[-20px]">
                    {navItems.map((item, index) =>
                      item.children ? (
                        <Accordion key={index} type="single" collapsible>
                          <AccordionItem
                            value={item.title}
                            className="border-b-0 p-0"
                          >
                            <AccordionTrigger
                              className={cn(
                                buttonVariants({
                                  size: "sm",
                                  variant: "ghost",
                                }),
                                "justify-between",
                                item.disabled && "cursor-not-allowed opacity-80"
                              )}
                            >
                              <div className="flex items-center justify-start">
                                {item.icon && (
                                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                                )}
                                <p>{item.title}</p>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col">
                                {item.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    href={child.to}
                                    className={cn(
                                      buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                      }),
                                      "justify-start ml-6",
                                      child.disabled &&
                                        "cursor-not-allowed opacity-80"
                                    )}
                                  >
                                    {child.title}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Link
                          key={index}
                          href={item.to}
                          className={cn(
                            buttonVariants({
                              size: "sm",
                              variant: "ghost",
                            }),
                            "justify-start",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              className="mr-2 h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {item.title}
                        </Link>
                      )
                    )}
                  </nav>
                )}
                <div className="flex flex-col gap-3 ml-[-20px] mt-2">
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
                          onClick={handleSignOut}
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Mobile Navbar Ends */}
        <div className="h-screen w-full bg-muted overflow-scroll overflow-x-hidden bg-white">
          {/* <Outlet /> */}
          <Toaster richColors />
        </div>
      </div>
    </>
  );
}

export default NewNav;