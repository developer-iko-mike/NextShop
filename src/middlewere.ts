import { NextRequest, NextResponse } from "next/server";

const adminEmails = ["developer.iko.mike@gmail.com", "amirQuf@gmail.com"];

export function middleware(request: NextRequest) {
  const token = JSON.parse(localStorage.getItem("user-store") || "")
  console.log(token)
  return NextResponse.next();
}

export const config = {
  matcher: ["/CMS/:path*"]
}