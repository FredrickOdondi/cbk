import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json');

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const products = await getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  await saveProducts(products);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  await saveProducts(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;

  await saveProducts(filtered);
  return true;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(lowercaseQuery) ||
    p.author.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getProductsByCategory(category: 'book' | 'bible'): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.category === category);
}
