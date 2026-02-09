// Simple in-memory storage for blogs (for development only)
// In production, use a real database like PostgreSQL, MongoDB, etc.

class BlogStorage {
  private blogs: any[] = [];

  getAll() {
    return this.blogs;
  }

  getPublished() {
    return this.blogs.filter((blog) => blog.published);
  }

  getById(id: string) {
    return this.blogs.find((blog) => blog.id === id);
  }

  create(blog: any) {
    const newBlog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...blog,
      createdAt: new Date().toISOString(),
    };
    this.blogs.push(newBlog);
    return newBlog;
  }

  update(id: string, data: any) {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) return null;

    this.blogs[index] = {
      ...this.blogs[index],
      ...data,
    };
    return this.blogs[index];
  }

  delete(id: string) {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index === -1) return false;

    this.blogs.splice(index, 1);
    return true;
  }
}

// Export a singleton instance
export const blogStorage = new BlogStorage();
