'use client';

import { BookOpen, FileText } from '@/components/icons';

interface AdminTabsProps {
  activeTab: 'products' | 'blogs';
  onTabChange: (tab: 'products' | 'blogs') => void;
  productCount: number;
  blogCount: number;
}

export default function AdminTabs({ activeTab, onTabChange, productCount, blogCount }: AdminTabsProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onTabChange('products')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 'products'
            ? 'bg-rose-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-rose-50 border-2 border-rose-200'
        }`}
      >
        <BookOpen size={18} />
        Products ({productCount})
      </button>
      <button
        onClick={() => onTabChange('blogs')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 'blogs'
            ? 'bg-rose-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-rose-50 border-2 border-rose-200'
        }`}
      >
        <FileText size={18} />
        Blogs ({blogCount})
      </button>
    </div>
  );
}
