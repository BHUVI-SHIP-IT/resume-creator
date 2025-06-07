import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified middleware for demo purposes
// In a real app, you would verify the authentication token
export function middleware(request: NextRequest) {
  // For demo purposes, we'll simulate authentication
  // In a real app, you would check for a valid session/token
  const isAuthenticated = true // Always allow access for the demo

  // If the user is not authenticated and trying to access protected routes
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
