import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/products';
import { Product } from '@/types/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    let products;

    if (query) {
      products = await getProducts();
      const lowercaseQuery = query.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.author.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery)
      );
    } else if (category && (category === 'book' || category === 'bible')) {
      products = await getProducts();
      products = products.filter(p => p.category === category);
    } else {
      products = await getProducts();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, category, description, price, image, inStock } = body;

    // Validate required fields
    if (!title || !author || !category || !description || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = await createProduct({
      title,
      author,
      category,
      description,
      price: Number(price),
      image: image || '/uploads/placeholder.jpg',
      inStock: inStock !== undefined ? inStock : true,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
