import { Blog } from '@/types/blog';
import { Calendar, User, ArrowLeft } from '@/components/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering - always fetch fresh data
export const dynamic = 'force-dynamic';

async function getBlog(id: string): Promise<Blog | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/api/blogs/${id}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-rose-100 to-rose-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <User size={16} />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-4">
            {blog.title}
          </h1>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-rose-200 text-rose-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 -mt-4">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
          <div className="prose prose-lg max-w-none">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <hr className="my-8 border-rose-100" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-semibold text-gray-900">{blog.author}</p>
            </div>
            <Link
              href="https://wa.me/254718808903"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Share on WhatsApp
            </Link>
          </div>
        </article>

        {/* Related */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-900 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Read More Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
