import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

// 获取网站内容
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('site_content')
      .select('*');

    if (error) {
      return NextResponse.json({ error: '查询失败' }, { status: 500 });
    }

    // 转换为对象格式
    const content: Record<string, string> = {};
    data?.forEach((item) => {
      content[item.key] = item.value;
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新网站内容
export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: '缺少key参数' }, { status: 400 });
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('site_content')
      .upsert({
        key,
        value: value || '',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' });

    if (error) {
      return NextResponse.json({ error: '更新失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '内容已更新' });
  } catch (error) {
    console.error('Update content error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
