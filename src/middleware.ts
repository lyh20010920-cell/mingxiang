import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 只保护 /admin/messages 和 /admin/content 路由
  if (pathname.startsWith('/admin/messages') || pathname.startsWith('/admin/content')) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/messages/:path*',
    '/admin/content/:path*'
  ],
};
