'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from '@/components/icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-rose-50 text-white sticky top-0 shadow-md animate-slide-down z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-200">✝️</div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-base md:text-xl leading-tight text-rose-900">Christian Book Store</h1>
              <p className="text-rose-700 text-xs">Kenya</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-rose-800 hover:text-rose-900 transition font-medium hover:scale-105 transform duration-200 text-sm">
              Home
            </Link>
            <Link href="/products" className="text-rose-800 hover:text-rose-900 transition font-medium hover:scale-105 transform duration-200 text-sm">
              Browse Books
            </Link>
            <Link href="/blog" className="text-rose-800 hover:text-rose-900 transition font-medium hover:scale-105 transform duration-200 text-sm">
              Blog
            </Link>
            <Link href="/admin" className="bg-rose-200 hover:bg-rose-300 text-rose-900 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform text-sm">
              Admin
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-rose-900 p-1.5 hover:scale-110 transition-transform duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-rose-200 animate-fade-in">
            <Link href="/" className="block py-2.5 px-3 text-rose-800 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-all duration-200 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="block py-2.5 px-3 text-rose-800 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-all duration-200 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Browse Books
            </Link>
            <Link href="/blog" className="block py-2.5 px-3 text-rose-800 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-all duration-200 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/admin" className="block py-2.5 px-3 text-rose-800 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-all duration-200 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
