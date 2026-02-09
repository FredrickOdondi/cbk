'use client';

import { useState } from 'react';
import { Blog } from '@/types/blog';

interface BlogFormProps {
  blog?: Blog;
  onSubmit: (data: Omit<Blog, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function BlogForm({ blog, onSubmit, onCancel, isSubmitting }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    excerpt: blog?.excerpt || '',
    author: blog?.author || 'Christian Book Store Kenya',
    coverImage: blog?.coverImage || '',
    tags: blog?.tags?.join(', ') || '',
    published: blog?.published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Blog Title *
        </label>
        <input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="Enter an engaging title for your blog post"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Short Summary *
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          required
          rows={2}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="A brief summary that appears in the blog card"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Blog Content *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
          rows={12}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="Write your blog content here... You can use multiple paragraphs."
        />
        <p className="mt-1 text-xs text-gray-500">Tip: Use separate paragraphs for better readability. Each line break will create a new paragraph.</p>
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
          Author *
        </label>
        <input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="Author name"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="faith, bible study, inspiration (comma separated)"
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
          placeholder="https://example.com/image.jpg"
        />
        {formData.coverImage && (
          <div className="mt-2">
            <img
              src={formData.coverImage}
              alt="Cover preview"
              className="w-full md:w-64 h-40 object-cover rounded border"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
          className="rounded w-4 h-4"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Publish immediately (uncheck to save as draft)
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto border-2 border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm md:text-base"
        >
          {isSubmitting ? 'Saving...' : blog ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>
    </form>
  );
}
