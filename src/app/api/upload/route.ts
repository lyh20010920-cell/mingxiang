import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

// 上传图片
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';

    if (!file) {
      return NextResponse.json({ error: '请选择文件' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: '不支持的文件类型' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '文件大小不能超过5MB' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${folder}/${timestamp}-${randomStr}.${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const supabase = createServerClient();
    const { data, error } = await supabase.storage
      .from('cms-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: '上传失败' }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('cms-images')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: filename,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 删除图片
export async function DELETE(request: NextRequest) {
  try {
    const token = getTokenFromHeader(
      request.headers.get('authorization')
    ) || request.cookies.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: '缺少文件路径' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase.storage
      .from('cms-images')
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
