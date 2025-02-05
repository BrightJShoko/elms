import { NextResponse } from "next/server";

export function middleware(req) {
  // Get cookies from the request
  const adminToken = req.cookies.get("adminauthtoken")?.value;
  const employeeToken = req.cookies.get("employeeauthtoken")?.value;
  // console.log("Admin Token:", adminToken);

  const pathname = req.nextUrl.pathname;

  // Check if the request is for an admin page and admin is not logged in
  if (pathname.startsWith("/admindashboard") && !adminToken) {
    return NextResponse.redirect(new URL("/adminlogin", req.url));
  }

  // Check if the request is for an employee page and employee is not logged in
  if (pathname.startsWith("/employeedashboard") && !employeeToken) {
    return NextResponse.redirect(new URL("/employeelogin", req.url));
  }

  return NextResponse.next(); // Allow request if authenticated
}

// ✅ Updated matcher to protect all admin and employee routes dynamically
export const config = {
  matcher: ["/admindashboard/:path*", "/employeedashboard/:path*"],
};
