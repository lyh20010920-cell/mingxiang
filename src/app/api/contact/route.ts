import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, company, type, message } = body;

    // 验证必填字段
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '姓名、电话和留言内容为必填项' },
        { status: 400 }
      );
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: '请输入有效的手机号码' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          phone,
          email: email || null,
          company: company || null,
          type: type || null,
          message,
          status: 'unread',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '提交失败，请稍后重试' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '留言提交成功！我们会尽快与您联系。',
      data: data[0],
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
