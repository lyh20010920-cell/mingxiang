import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

// 获取留言列表
export async function GET(request: NextRequest) {
  try {
    // 验证管理员身份
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const supabase = createServerClient();

    let query = supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: '查询失败' }, { status: 500 });
    }

    return NextResponse.json({
      messages: data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新留言状态
export async function PATCH(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: '参数错误' }, { status: 400 });
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: '更新失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '状态已更新' });
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 删除留言
export async function DELETE(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少ID参数' }, { status: 400 });
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '已删除' });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
