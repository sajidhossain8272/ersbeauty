import React from 'react';
import ProductPage from './product/[slug]/page';

// Direct execution of the dynamic product details page for the seeded product at root URL.
export default async function Home() {
  // Pass the slug parameters just as the dynamic route would receive them
  const params = Promise.resolve({ slug: 'dr-yunmei-collagen-anti-wrinkle-cream' });
  
  return <ProductPage params={params} />;
}
