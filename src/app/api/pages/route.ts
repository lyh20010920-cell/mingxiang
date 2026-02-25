import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

// 获取页面组件列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('page');

    const supabase = createServerClient();

    let query = supabase
      .from('page_components')
      .select('*')
      .order('order_index');

    if (pageSlug) {
      query = query.eq('page_slug', pageSlug);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: '查询失败' }, { status: 500 });
    }

    return NextResponse.json({ components: data || [] });
  } catch (error) {
    console.error('Get page components error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 保存页面组件配置
export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { components, pageSlug } = body;

    if (!pageSlug || !Array.isArray(components)) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Delete existing components for this page
    await supabase
      .from('page_components')
      .delete()
      .eq('page_slug', pageSlug);

    // Insert new components
    if (components.length > 0) {
      const insertData = components.map((comp: any, index: number) => ({
        page_slug: pageSlug,
        component_type: comp.componentType,
        title: comp.title || '',
        content: comp.content || {},
        order_index: index,
        is_visible: comp.isVisible !== false,
      }));

      const { error } = await supabase
        .from('page_components')
        .insert(insertData);

      if (error) {
        console.error('Insert components error:', error);
        return NextResponse.json({ error: '保存失败' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: '页面配置已保存' });
  } catch (error) {
    console.error('Save page components error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
