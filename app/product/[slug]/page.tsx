import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getProductsData } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import PurchasePanel from '@/components/PurchasePanel';
import ProductTabs from '@/components/ProductTabs';
import ReviewEngine from '@/components/ReviewEngine';
import ImageGallery from '@/components/ImageGallery';
import { ShieldCheck, Truck, RotateCcw, HelpCircle, Star } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Calculate average rating of reviews (in case it changes)
  const averageRating = product.reviews.length > 0 
    ? (product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length).toFixed(1)
    : "5.0";

  // Get suggested products (other than current product)
  const allProducts = getProductsData();
  const suggestedProducts = allProducts.filter((p) => p.slug !== slug);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-grow bg-white max-w-7xl w-full mx-auto px-4 py-6 md:py-10">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-bold text-gray-400 mb-6 flex items-center gap-1.5 uppercase tracking-wider select-none">
          <span className="hover:text-brand-blue cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:text-brand-blue cursor-pointer">Skin Care</span>
          <span>/</span>
          <span className="hover:text-brand-blue cursor-pointer">{product.brand}</span>
          <span>/</span>
          <span className="text-gray-700">{product.name.split(' (')[0]}</span>
        </nav>

        {/* Dynamic Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Showcase (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Client image gallery with all 5 pictures */}
            <ImageGallery 
              images={product.images || [product.imageUrl]} 
              productName={product.name} 
              discountPercent={product.discountPercent} 
            />

            {/* Sidebar Trust Highlights */}
            <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-gray-900">100% Genuine Skincare</p>
                  <p className="text-gray-500 font-semibold mt-0.5">Imported directly from China (চীন).</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
                  <Truck size={16} />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-gray-900">Dhaka & Nationwide Delivery</p>
                  <p className="text-gray-500 font-semibold mt-0.5">Cash on delivery. Pay only after checking the parcel.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
                  <RotateCcw size={16} />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-gray-900">Easy Returns & Exchanges</p>
                  <p className="text-gray-500 font-semibold mt-0.5">7 Days exchange policy for un-opened products.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Checkout panel & description highlights (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-brand-blue bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs font-extrabold text-gray-500 bg-gray-100/70 border border-gray-200/50 px-2.5 py-0.5 rounded-full">
                  {product.slug === 'dr-yunmei-collagen-anti-wrinkle-cream' ? '50g' : product.slug === 'ersbeauty-collagen-eye-cream' ? '30g' : '40ml'}
                </span>
                
                {/* Micro stars summary */}
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <span>({product.reviews.length})</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Flash Sale Countdown (Always keeps dynamic urgency) */}
            <CountdownTimer endTime={product.flashSaleEnds} />

            {/* Purchase Panel component (holds price, selector, order forms) */}
            <PurchasePanel 
              id={product.id}
              slug={product.slug}
              imageUrl={product.imageUrl}
              brand={product.brand}
              price={product.price}
              originalPrice={product.originalPrice}
              saveAmount={product.saveAmount}
              discountPercent={product.discountPercent}
              stockStatus={product.stockStatus}
              isAuthentic={product.isAuthentic}
              productName={product.name.split(' (')[0]}
            />

            {/* Brief Bengali pitch */}
            <div className="bg-blue-50/20 border border-blue-50 p-4 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                ✨ {product.description.substring(0, 150)}... <strong>পণ্যটির বিস্তারিত বিবরণ নিচে দেখুন।</strong>
              </p>
            </div>

          </div>

        </div>

        {/* Tabs Detail Section */}
        <ProductTabs 
          id={product.id}
          description={product.description}
          ingredients={product.ingredients}
          highlights={product.highlights}
          brand={product.brand}
          name={product.name}
        />

        {/* Suggested Products (You May Also Like) */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <span>আপনার পছন্দ হতে পারে এমন প্রোডাক্টস (Suggested Products)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {suggestedProducts.map((p) => {
              const isOutOfStock = p.stockStatus.toLowerCase().includes('out of stock') || p.stockStatus.includes('স্টক শেষ');
              return (
                <Link 
                  href={`/product/${p.slug}`}
                  key={p.id}
                  className="bg-white rounded-2xl border border-pink-100/70 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-4">
                    {/* Floating Discount Tag */}
                    <div className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      -{p.discountPercent}%
                    </div>
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
                        <span className="bg-brand-red text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                          স্টক শেষ
                        </span>
                      </div>
                    )}
                    <div className="relative w-full h-full min-h-[160px] flex items-center justify-center">
                      <Image 
                        src={p.imageUrl} 
                        alt={p.name} 
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider mb-1">
                      {p.brand}
                    </span>
                    <h4 className="text-xs font-extrabold text-gray-800 line-clamp-2 leading-snug min-h-[32px] group-hover:text-brand-blue transition-colors">
                      {p.name.split(' (')[0]}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-black text-brand-blue">৳{p.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">৳{p.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-brand-red">
                        {p.stockStatus}
                      </span>
                      <span className="text-xs font-black text-brand-blue group-hover:underline flex items-center gap-1">
                        বিস্তারিত দেখুন →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Review Section */}
        <ReviewEngine reviews={product.reviews} />

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
