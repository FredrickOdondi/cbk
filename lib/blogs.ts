import { Blog } from '@/types/blog';

export async function getBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?published=true`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs/${id}`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog by id:', error);
    return null;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getPublishedBlogs();
  return blogs.find(
    (blog) => blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  ) || null;
}
