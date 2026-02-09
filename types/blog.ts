export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  published: boolean;
}
