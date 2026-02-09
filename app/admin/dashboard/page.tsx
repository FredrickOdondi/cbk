'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { Product } from '@/types/product';
import { Blog } from '@/types/blog';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';
import BlogList from '@/components/admin/BlogList';
import BlogForm from '@/components/admin/BlogForm';
import AdminTabs from '@/components/admin/AdminTabs';
import { Plus, LogOut } from '@/components/icons';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'blogs'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchBlogs();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (!response.ok) {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    console.log('Deleting product:', id);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      console.log('Delete response:', response.status);

      if (response.ok) {
        await fetchProducts();
        alert('Product deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to delete: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleProductSubmit = async (data: Omit<Product, 'id' | 'createdAt'>) => {
    setSubmitting(true);

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : '/api/products';

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(undefined);
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddBlog = () => {
    setEditingBlog(undefined);
    setShowForm(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleBlogSubmit = async (data: Omit<Blog, 'id' | 'createdAt'>) => {
    setSubmitting(true);

    try {
      const url = editingBlog
        ? `/api/blogs/${editingBlog.id}`
        : '/api/blogs';

      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchBlogs();
        setShowForm(false);
        setEditingBlog(undefined);
      } else {
        alert('Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-rose-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your content</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 md:mt-0">
            <button
              onClick={activeTab === 'products' ? handleAddProduct : handleAddBlog}
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Plus size={18} />
              {activeTab === 'products' ? 'Add Product' : 'Write Blog'}
            </button>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto border-2 border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <AdminTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          productCount={products.length}
          blogCount={blogs.length}
        />

        {/* Form */}
        {showForm ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-rose-100">
              <h2 className="text-xl md:text-2xl font-bold text-rose-900">
                {activeTab === 'products'
                  ? (editingProduct ? 'Edit Product' : 'Add New Product')
                  : (editingBlog ? 'Edit Blog' : 'Write New Blog')
                }
              </h2>
            </div>
            <div className="p-4 md:p-6">
              {activeTab === 'products' ? (
                <ProductForm
                  product={editingProduct}
                  onSubmit={handleProductSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingProduct(undefined);
                  }}
                  isSubmitting={submitting}
                />
              ) : (
                <BlogForm
                  blog={editingBlog}
                  onSubmit={handleBlogSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingBlog(undefined);
                  }}
                  isSubmitting={submitting}
                />
              )}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-rose-100">
              <h2 className="text-xl md:text-2xl font-bold text-rose-900">
                {activeTab === 'products' ? `Products (${products.length})` : `Blog Posts (${blogs.length})`}
              </h2>
            </div>
            <div className="p-3 md:p-6">
              {activeTab === 'products' ? (
                <ProductTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ) : (
                <BlogList
                  blogs={blogs}
                  onEdit={handleEditBlog}
                  onDelete={handleDeleteBlog}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
