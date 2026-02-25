import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 暂时禁用中间件，允许所有请求通过
  // 稍后可以重新启用
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/messages/:path*',
    '/admin/content/:path*'
  ],
};
