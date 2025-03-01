import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  // Check if the request is for the settings page
  if (request.nextUrl.pathname.startsWith('/settings')) {
    // Here you would implement your actual admin authentication check
    // This is just a placeholder - replace with your actual admin check
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/settings/:path*',
    '/dashboard/:path*',
    '/disputes/:path*',
    '/account/:path*',
  ],
};