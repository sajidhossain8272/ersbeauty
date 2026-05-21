import fs from 'fs';
import path from 'path';

export interface ProductHighlight {
  title: string;
  description: string;
}

export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  reviewer: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  saveAmount: number;
  imageUrl: string;
  images?: string[];
  stockStatus: string;
  isAuthentic: boolean;
  flashSaleEnds: string;
  ingredients: string[];
  highlights: ProductHighlight[];
  reviews: ProductReview[];
}

export function getProductsData(): Product[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'data.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data.products || [];
  } catch (error) {
    console.error('Error reading products data:', error);
    return [];
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProductsData();
  return products.find((p) => p.slug === slug);
}
