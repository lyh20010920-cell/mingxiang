import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: '已退出登录',
  });

  response.cookies.delete('admin_token');

  return response;
}
