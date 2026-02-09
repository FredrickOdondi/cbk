'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-rose-900 mb-1 md:mb-2">Admin Login</h1>
            <p className="text-gray-600 text-sm md:text-base">Enter password to access dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 text-white py-2.5 md:py-3 px-4 md:px-4 rounded-lg hover:bg-rose-700 transition font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs md:text-sm text-amber-900">
                <strong>Dev Mode:</strong> Default password is <code>admin123</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
