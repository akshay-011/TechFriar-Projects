import { NextRequest, NextResponse } from 'next/server';


// middleware to check if user logged in 
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth")?.value;

  if(!token){
    console.log("No Token found", token);
    return NextResponse.redirect(new URL("/login", request.url));
  }
    
  return NextResponse.next();
}

export const config = {
  matcher: '/chat/:param',
}