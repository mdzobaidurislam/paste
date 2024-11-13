
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
  const token = await auth();
  const { pathname, searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('callbackUrl');

  // Determine if the user is trying to access an admin route
  let loginUrl;
  if (pathname.startsWith('/admin')) {
    loginUrl = new URL('/admin', req.url); // Admin login URL
    loginUrl.searchParams.set('callbackUrl', pathname);
  } else {
    loginUrl = new URL('/auth', req.url); // Regular user login URL
    loginUrl.searchParams.set('callbackUrl', pathname);
  }

  // If the user is logged in, redirect away from login page
  if (token && pathname === '/auth') {
    const redirectTo = redirectUrl || '/profile'; // Redirect to profile or specified callback URL
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Define protected routes
  const protectedRoutes = ['/admin/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If the user is not logged in and trying to access a protected route, redirect to login page
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
