'use client';

import { Product } from '@/types/product';
import { Pencil, Trash2 } from '@/components/icons';
import { formatPrice } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products yet. Add your first product to get started.
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-rose-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base truncate">{product.title}</h3>
                <p className="text-sm text-gray-600 truncate">{product.author}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0 ${
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-1 capitalize text-gray-900">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-1 font-bold text-rose-600">{formatPrice(product.price)}</span>
              </div>
            </div>

            {product.description && (
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Delete button clicked for product:', product.id);
                  // Delete directly without confirm for now
                  onDelete(product.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium cursor-pointer"
                type="button"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-rose-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Author</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-rose-50 hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 text-gray-900">{product.title}</td>
                <td className="py-3 px-4 text-gray-600">{product.author}</td>
                <td className="py-3 px-4 capitalize text-gray-600">{product.category}</td>
                <td className="py-3 px-4 font-bold text-rose-600">{formatPrice(product.price)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 border-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Delete button clicked for product:', product.id);
                        // Delete directly without confirm for now
                        onDelete(product.id);
                      }}
                      className="p-2 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                      type="button"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
