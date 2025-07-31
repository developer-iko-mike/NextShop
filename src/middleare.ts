import { NextRequest, NextResponse } from "next/server";

const adminEmails = ["developer.iko.mike@gmail.com", "amirQuf@gmail.com"];

export function middleware(request: NextRequest) {
  console.log("Middleware executed"); 
  const { pathname } = request.nextUrl;
  const email = request.cookies.get("gmail")?.value;

  console.log("Pathname:", pathname);
  console.log("Email from cookie:", email);

  if (pathname.toLowerCase().startsWith("/CMS")) {
    if (!email) {
      console.log("No email cookie, redirecting to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!adminEmails.includes(email)) {
      console.log("Email not admin, redirecting to /not-authorized");
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  return NextResponse.next();
}
