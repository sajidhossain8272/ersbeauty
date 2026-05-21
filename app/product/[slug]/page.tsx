import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import PurchasePanel from '@/components/PurchasePanel';
import ProductTabs from '@/components/ProductTabs';
import ReviewEngine from '@/components/ReviewEngine';
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
            
            {/* Image Wrapper */}
            <div className="relative aspect-square w-full bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden group shadow-sm flex items-center justify-center">
              {/* Floating Discount Badge */}
              <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-red/20 transform -rotate-3 select-none animate-pulse">
                -{product.discountPercent}% OFF
              </div>

              {/* Main Product Image */}
              <div className="relative w-full h-full p-2">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            {/* Thumbnail Gallery (Korean Mart Style: Premium visual previews) */}
            <div className="grid grid-cols-4 gap-3 select-none">
              <div className="aspect-square rounded-xl border-2 border-brand-blue overflow-hidden relative bg-gray-50 p-1 cursor-pointer">
                <Image src={product.imageUrl} alt="Thumbnail 1" fill className="object-contain" />
              </div>
              
              <div className="aspect-square rounded-xl border border-gray-200 overflow-hidden relative bg-gray-50 flex items-center justify-center flex-col p-1 hover:border-brand-blue transition-colors cursor-pointer text-center">
                <div className="text-[10px] font-black text-brand-blue leading-none">COLLAGEN</div>
                <span className="text-[8px] font-bold text-gray-500 mt-1">রিকম্বিন্যান্ট</span>
              </div>

              <div className="aspect-square rounded-xl border border-gray-200 overflow-hidden relative bg-gray-50 flex items-center justify-center flex-col p-1 hover:border-brand-blue transition-colors cursor-pointer text-center">
                <div className="text-[10px] font-black text-amber-500 leading-none">24K GOLD</div>
                <span className="text-[8px] font-bold text-gray-500 mt-1">খাঁটি সোনা</span>
              </div>

              <div className="aspect-square rounded-xl border border-gray-200 overflow-hidden relative bg-gray-50 flex items-center justify-center flex-col p-1 hover:border-brand-blue transition-colors cursor-pointer text-center">
                <div className="text-[10px] font-black text-emerald-500 leading-none">HYDRATE</div>
                <span className="text-[8px] font-bold text-gray-500 mt-1">গভীর আর্দ্রতা</span>
              </div>
            </div>

            {/* Sidebar Trust Highlights */}
            <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-gray-900">100% Genuine Skincare</p>
                  <p className="text-gray-500 font-semibold mt-0.5">Imported directly from Seoul, South Korea.</p>
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
          description={product.description}
          ingredients={product.ingredients}
          highlights={product.highlights}
          brand={product.brand}
          name={product.name}
        />

        {/* Review Section */}
        <ReviewEngine reviews={product.reviews} />

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
