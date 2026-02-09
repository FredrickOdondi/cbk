import Link from 'next/link';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { MessageCircle } from '@/components/icons';
import { ArrowLeft } from '@/components/icons';
import { notFound } from 'next/navigation';

const WHATSAPP_NUMBER = '254718808903';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ordering: ${product.title} by ${product.author} (Ksh ${product.price})`
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center text-rose-700 hover:text-rose-800 mb-4 md:mb-6 font-medium text-sm">
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
            <div className="aspect-[3/4] bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg md:rounded-xl overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl md:text-9xl opacity-20">✝️</span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-bold text-rose-600 uppercase mb-1 md:mb-2 tracking-wide">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                {product.title}
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-2 md:mb-4">{product.author}</p>
              <p className="text-3xl md:text-5xl font-bold text-rose-600 mb-4 md:mb-6">
                {formatPrice(product.price)}
              </p>

              <div className="mb-4 md:mb-6">
                <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="mb-4 md:mb-8">
                <h2 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-gray-900">Description</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-600 py-3 md:py-4 text-base md:text-lg"
                    disabled={!product.inStock}
                  >
                    <MessageCircle size={20} />
                    Order via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
