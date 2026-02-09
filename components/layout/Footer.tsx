import { Mail, Phone, Instagram } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Christian Book Store Kenya</h3>
            <p className="text-gray-400 text-xs md:text-sm">
              Your trusted source for Christian literature and Bibles in Kenya.
              Grow your faith with our carefully curated collection.
            </p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="/products?category=book" className="text-gray-400 hover:text-white transition">
                  Books
                </a>
              </li>
              <li>
                <a href="/products?category=bible" className="text-gray-400 hover:text-white transition">
                  Bibles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span>+254 718 808903</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>info@christianbookstorekenya.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Christian Book Store Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
