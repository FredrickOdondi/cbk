import { Blog } from '@/types/blog';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from '@/components/icons';

// Force dynamic rendering - always fetch fresh data
export const dynamic = 'force-dynamic';

async function getBlogs(): Promise<Blog[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/api/blogs?published=true`, {
      cache: 'no-store',
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-3 md:mb-4">
            Christian Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Inspirational writings, Bible study insights, and faith-building articles to help you grow in your spiritual journey
          </p>
        </div>

        {/* Featured Post */}
        {blogs.length > 0 && (
          <div className="mb-12">
            <Link href={`/blog/${blogs[0].id}`}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                {blogs[0].coverImage && (
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={blogs[0].coverImage}
                      alt={blogs[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <span className="inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Featured
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{blogs[0].title}</h2>
                      <p className="text-white/90 line-clamp-2 mb-4">{blogs[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {blogs[0].author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(blogs[0].createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {!blogs[0].coverImage && (
                  <div className="p-6 md:p-8">
                    <span className="inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-3">{blogs[0].title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{blogs[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {blogs[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(blogs[0].createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {blogs.length > 1 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(1).map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full flex flex-col">
                    {blog.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{blog.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        {blog.tags && blog.tags.length > 0 && (
                          <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded">
                            {blog.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No blog posts yet</h3>
            <p className="text-gray-500">Check back soon for inspirational content!</p>
          </div>
        )}
      </div>
    </div>
  );
}
