export interface Product {
  id: string;
  title: string;
  author: string;
  category: 'book' | 'bible';
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  createdAt: string;
}

export interface Category {
  value: 'book' | 'bible';
  label: string;
}

export const CATEGORIES: Category[] = [
  { value: 'book', label: 'Books' },
  { value: 'bible', label: 'Bibles' },
];
