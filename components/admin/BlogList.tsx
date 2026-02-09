'use client';

import { Blog } from '@/types/blog';
import { Pencil, Trash2 } from '@/components/icons';

interface BlogListProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No blog posts yet</h3>
        <p className="text-gray-500">Start writing your first Christian blog post!</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-rose-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-gray-500 mt-1">By {blog.author}</p>
              </div>
              <span className={`ml-2 flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
                blog.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </div>

            {blog.excerpt && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.tags.length > 0 && (
                <span className="flex gap-1 flex-wrap justify-end">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(blog)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                    onDelete(blog.id);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
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
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-rose-50 hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="max-w-xs">
                    <p className="text-gray-900 font-medium truncate">{blog.title}</p>
                    {blog.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{blog.author}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    blog.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(blog)}
                      className="p-2 border-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                          onDelete(blog.id);
                        }
                      }}
                      className="p-2 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
