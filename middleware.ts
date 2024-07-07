
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  //console.log("middleware auth", req.auth);
  if (req.auth && req.nextUrl.pathname === "/auth/signin") {
    //console.log("redirecting to dashboard")
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  //console.log("ROUTE:", req.nextUrl.pathname);
  NextResponse.next();
});
export const config = {
  matcher: [
    "/auth/signin",
    "/auth/signup",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
