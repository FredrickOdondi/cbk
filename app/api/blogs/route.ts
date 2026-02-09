import { NextRequest, NextResponse } from 'next/server';
import { blogStorage } from '@/lib/blog-storage';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get('published');

  if (published === 'true') {
    return NextResponse.json(blogStorage.getPublished());
  }

  return NextResponse.json(blogStorage.getAll());
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newBlog = blogStorage.create(data);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
