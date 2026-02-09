import { getProducts } from '@/lib/products';
import { Blog } from '@/types/blog';
import Hero from '@/components/layout/Hero';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { ArrowRight, Calendar } from '@/components/icons';

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

export default async function HomePage() {
  const products = await getProducts();
  const blogs = await getBlogs();
  const featuredProducts = products.slice(0, 4);
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl md:rounded-3xl shadow-lg mb-4 md:mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <span className="text-3xl md:text-4xl">📚</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
              Handpicked Christian literature and Bibles to inspire and strengthen your faith
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge for first product */}
                {index === 0 && (
                  <div className="absolute -top-3 -left-2 z-20 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform -rotate-12">
                    ⭐ Bestseller
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          {products.length > 4 && (
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-semibold py-3.5 px-8 md:py-4 md:px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50 text-sm md:text-base"
              >
                <span>View All Products</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-xl hover:bg-rose-50/50 transition-colors">
              <div className="text-3xl md:text-4xl mb-2">🚚</div>
              <p className="text-xs md:text-sm font-semibold text-gray-700">Fast Delivery</p>
              <p className="text-xs text-gray-500 mt-1">Anywhere in Kenya</p>
            </div>
            <div className="text-center p-4 rounded-xl hover:bg-rose-50/50 transition-colors">
              <div className="text-3xl md:text-4xl mb-2">✓</div>
              <p className="text-xs md:text-sm font-semibold text-gray-700">Authentic</p>
              <p className="text-xs text-gray-500 mt-1">Guaranteed Quality</p>
            </div>
            <div className="text-center p-4 rounded-xl hover:bg-rose-50/50 transition-colors">
              <div className="text-3xl md:text-4xl mb-2">💬</div>
              <p className="text-xs md:text-sm font-semibold text-gray-700">Easy Order</p>
              <p className="text-xs text-gray-500 mt-1">Via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentBlogs.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Latest from Our Blog
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Inspirational articles and faith-building content
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-2 text-rose-600 hover:text-rose-900 font-medium transition-colors"
              >
                View All
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recentBlogs.map((blog) => (
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
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center md:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-900 font-medium transition-colors"
              >
                View All Blog Posts
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              About Christian Book Store Kenya
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 leading-relaxed px-4">
              We are dedicated to providing Christians in Kenya with access to quality
              Christian literature and Bibles. Our carefully curated collection is designed
              to help you grow in your faith and deepen your understanding of God's Word.
            </p>
            <p className="text-gray-600 text-sm md:text-base px-4">
              Order easily through WhatsApp, and enjoy fast delivery
              anywhere in Kenya.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
