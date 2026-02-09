import Link from 'next/link';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { MessageCircle } from '@/components/icons';

interface ProductCardProps {
  product: Product;
}

const WHATSAPP_NUMBER = '254718808903';

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to order: ${product.title} by ${product.author} - Ksh ${product.price}`
  );

  return (
    <Card className="group overflow-hidden border-2 border-rose-100 hover:border-rose-400 hover:shadow-2xl transition-all duration-500 animate-fade-in bg-white">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[3/4] bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 relative overflow-hidden">
          {product.image ? (
            <>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50">
              <span className="text-6xl md:text-8xl opacity-30">✝️</span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg animate-pulse">
              Out of Stock
            </div>
          )}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wide shadow-md">
            {product.category}
          </div>
        </div>
      </Link>

      <CardContent className="p-3 md:p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-gray-900 group-hover:text-rose-600 transition-colors leading-tight line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2 md:mb-3 text-xs md:text-sm font-medium">{product.author}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </p>
          {product.inStock && (
            <div className="flex items-center gap-1 text-green-600 text-xs md:text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              In Stock
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-5 pt-0">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:grayscale text-sm md:text-base shadow-md hover:shadow-green-200/50"
            disabled={!product.inStock}
          >
            <MessageCircle size={16} className="animate-pulse" />
            Order via WhatsApp
          </button>
        </a>
      </CardFooter>
    </Card>
  );
}
