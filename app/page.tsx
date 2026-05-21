import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductsData } from '@/lib/db';
import { ShieldCheck, Truck, RotateCcw, Flame, Award, Star, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: "ersbeauty | Premium Genuine Skincare & Cosmetics Bangladesh",
  description: "Explore and shop premium, 100% authentic international beauty & skincare products at ersbeauty. Genuine products, cash on delivery.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categoryQuery = resolvedParams.category;
  const searchQuery = resolvedParams.search;

  const products = getProductsData();

  // Filter products based on searchParams
  let filteredProducts = products;

  if (categoryQuery) {
    const cq = categoryQuery.toLowerCase();
    if (cq === 'brands') {
      filteredProducts = products.filter((p) => p.brand === 'Dr. Yunmei');
    } else if (cq === 'special offer') {
      filteredProducts = products.filter((p) => p.price < p.originalPrice);
    } else {
      filteredProducts = products.filter((p) => p.category?.toLowerCase() === cq);
    }
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Header />

      {/* 1. Hero Section (Blushing Baby Pink) */}
      <section className="relative bg-gradient-to-br from-[#FFF0F2] via-[#FFE5E8] to-[#FFF0F2] text-gray-900 overflow-hidden py-16 md:py-24 border-b border-pink-100">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[250px] h-[250px] bg-brand-red/5 rounded-full blur-[60px]" />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-3.5 py-1.5 rounded-full text-brand-blue text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>১০০% অরিজিনাল স্কিনকেয়ার কালেকশন</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-gray-900">
              আপনার ত্বকের হারিয়ে যাওয়া তারুণ্য ও <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">ন্যাচারাল গ্লো</span> ফিরিয়ে আনুন
            </h1>

            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 font-semibold leading-relaxed">
              সরাসরি আমদানিকৃত অরিজিনাল অ্যান্টি-রিঙ্কেল কোলাজেন ক্রিম, আই ক্রিম ও এসেন্সের প্রিমিয়াম রেঞ্জ। কোনো ক্ষতিকারক কেমিক্যাল ছাড়া ত্বকের গভীর থেকে যত্ন নিন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="#products-section" 
                className="px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 transition-all duration-200"
              >
                <span>কালেকশন দেখুন</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href="/product/dr-yunmei-collagen-anti-wrinkle-cream" 
                className="px-8 py-4 bg-white/70 hover:bg-white text-gray-800 border border-pink-200 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
              >
                <span>বেস্ট সেলার ক্রিম</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-pink-200 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-brand-blue">১০০%</p>
                <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mt-0.5">জেনুইন ব্র্যান্ডস</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-blue">৳৮০</p>
                <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mt-0.5">ঢাকা ডেলিভারি</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-blue">২৪ ঘণ্টা</p>
                <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mt-0.5">সাপোর্ট রেসপন্স</p>
              </div>
            </div>
          </div>

          {/* Hero Right Banner Image / Graphic (Enlarged) */}
          <div className="lg:col-span-5 flex justify-center select-none">
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-pink-100 p-6 flex flex-col justify-between shadow-xl shadow-pink-100/50">
              {/* Product Badge */}
              <div className="flex justify-between items-start">
                <span className="bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider animate-pulse">
                  HOT DEALS
                </span>
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                </div>
              </div>

              {/* Central representation (Enlarged Image) */}
              <div className="relative w-full h-[340px] my-4 flex items-center justify-center">
                <Image 
                  src="/images/product-4.jpg" 
                  alt="Dr. Yunmei Gold Recombinant Collagen Anti-Wrinkle Cream" 
                  fill
                  priority
                  className="object-contain hover:scale-105 transition-transform duration-300 p-2"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">
                  Dr. Yunmei Gold Recombinant Collagen Anti-Wrinkle Cream <br />
                  <span className="text-xs font-semibold text-gray-500">(ডক্টর ইউনমেই গোল্ড রিকম্বিন্যান্ট কোলাজেন অ্যান্টি-রিঙ্কেল ক্রিম)</span>
                </h3>
                <p className="text-[10px] font-bold text-gray-500">৩টি কাস্টমার রিভিউ ও অফার প্রাইস</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-black text-brand-blue">৳১,০৯০ <span className="text-xs text-gray-400 line-through">৳১,৬৯০</span></span>
                  <Link 
                    href="/product/dr-yunmei-collagen-anti-wrinkle-cream" 
                    className="text-xs font-black text-brand-blue hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/50"
                  >
                    অর্ডার করুন →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Trust Banner */}
      <section className="bg-white border-b border-gray-150 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-150">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm">১০০% আসল প্রোডাক্ট</h4>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">সরাসরি আমদানিকৃত জেনুইন স্কিনকেয়ারের নিশ্চয়তা।</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-150">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">সারা দেশে ক্যাশ অন ডেলিভারি। চেক করে মূল্য পরিশোধ করুন।</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-150">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue shrink-0">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm">সহজ রিটার্ন পলিসি</h4>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">পছন্দ না হলে বা কোনো ড্যামেজ থাকলে সহজে এক্সচেঞ্জ করুন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catalog Products Grid */}
      <section id="products-section" className="max-w-7xl w-full mx-auto px-4 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {categoryQuery || searchQuery ? (
            <div className="inline-flex flex-col items-center">
              <span className="text-xs font-black text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Filter Active
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-4">
                {categoryQuery ? `ক্যাটাগরি: "${categoryQuery}"` : `অনুসন্ধান: "${searchQuery}"`}
              </h2>
              <Link href="/" className="text-xs text-brand-red font-bold hover:underline mt-2 flex items-center gap-1">
                ফিল্টার মুছুন (Clear Filter) ✕
              </Link>
            </div>
          ) : (
            <>
              <span className="text-xs font-black text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Our Products
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-4 leading-tight">
                প্রিমিয়াম কোলাজেন স্কিনকেয়ার প্রোডাক্টস
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-2.5 leading-relaxed">
                আপনার দৈনন্দিন ত্বকের যত্নে সেরা প্রোডাক্টগুলো বেছে নিন। অরিজিনাল কোলাজেন ফর্মুলা দিয়ে তৈরি যা বলিরেখা ও ডার্ক সার্কেল দূর করতে সাহায্য করে।
              </p>
            </>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)</h3>
            <p className="text-sm text-gray-500 font-semibold mb-6">
              দুঃখিত, আপনার অনুসন্ধান বা ক্যাটাগরির সাথে সামঞ্জস্যপূর্ণ কোনো প্রোডাক্ট আমাদের স্টোরে এই মুহূর্তে নেই।
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-sm rounded-xl transition-all duration-200"
            >
              সব প্রোডাক্ট দেখুন (View All Products)
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stockStatus.toLowerCase().includes('out of stock') || product.stockStatus.includes('স্টক শেষ');
              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-pink-100/70 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image showcase */}
                  <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-6 select-none">
                    {/* Discount tag */}
                    <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs font-black px-3 py-1.5 rounded-full transform -rotate-3">
                      -{product.discountPercent}% OFF
                    </div>

                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
                        <span className="bg-brand-red text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                          স্টক শেষ (Out of Stock)
                        </span>
                      </div>
                    )}

                    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center p-3">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-350"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  </div>

                  {/* Card description details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-brand-blue bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">Origin: China (চীন)</span>
                    </div>

                    <h3 className="text-base font-extrabold text-gray-800 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors min-h-[44px]">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 font-semibold mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-brand-blue">
                            ৳{product.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-gray-400 line-through">
                            ৳{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-1">Delivery Charge Inside Dhaka ৳৮০</p>
                      </div>

                      <span className="text-xs font-black text-brand-red bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                        Save ৳{product.saveAmount}
                      </span>
                    </div>

                    {/* Actions buttons */}
                    <div className="mt-6 pt-2">
                      {isOutOfStock ? (
                        <Link 
                          href={`/product/${product.slug}`}
                          className="w-full py-3.5 bg-gray-150 text-gray-400 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          <span>বিস্তারিত দেখুন (Out of Stock)</span>
                        </Link>
                      ) : (
                        <Link 
                          href={`/product/${product.slug}`}
                          className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                          <Flame size={14} className="fill-white" />
                          <span>অর্ডার করুন (Order Now)</span>
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Mini Trust badges section */}
      <section className="bg-brand-navy text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-black text-brand-blue bg-brand-blue/20 border border-brand-blue/40 px-3 py-1 rounded-full uppercase tracking-wider">
              Secure Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              অর্ডার করুন কোন ঝামেলা ছাড়াই, <br />ডেলিভারি পেয়ে মূল্য পরিশোধ করুন!
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              আমাদের ক্যাশ অন ডেলিভারি সেবায় আপনাকে কোনো অগ্রিম পেমেন্ট করতে হবে না। ডেলিভারি ম্যান পণ্য নিয়ে আপনার ঠিকানায় যাওয়ার পর আপনি পণ্য দেখে ও সন্তুষ্ট হয়েই মূল্য পরিশোধ করতে পারবেন।
            </p>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0">✓</div>
                <span>অগ্রিম কোনো বুকিং মানি প্রয়োজন নেই।</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0">✓</div>
                <span>ঢাকা সিটির ভেতরে ডেলিভারি মাত্র ১-২ দিনে।</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0">✓</div>
                <span>প্যাকিং খোলার পর কোনো সমস্যা থাকলে ২৪ ঘণ্টার মধ্যে রিটার্ন।</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
            <h3 className="font-extrabold text-white text-lg border-b border-white/10 pb-4">
              ডেলিভারি ও চার্জের সারসংক্ষেপ
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-400">ঢাকা সিটির ভেতরে ডেলিভারি ফি:</span>
                <span className="font-bold text-white">৳৮০ (ক্যাশ অন ডেলিভারি)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-400">ঢাকা সিটির বাইরে ডেলিভারি ফি:</span>
                <span className="font-bold text-white">৳১২০ (ক্যাশ অন ডেলিভারি)</span>
              </div>
              <div className="flex justify-between items-center text-sm text-brand-blue font-bold border-t border-white/5 pt-4">
                <span>ফ্রি ডেলিভারি সুযোগ:</span>
                <span>৳১,৫০০+ টাকার অর্ডারে ফি সম্পূর্ণ ফ্রি!</span>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-xs text-yellow-500 font-bold">
              💡 বিশেষ সতর্কতা: পণ্য রিসিভ করার সময় ডেলিভারি ম্যানের সামনেই প্যাকেট খুলে প্রোডাক্টটি চেক করুন। কোনো অসঙ্গতি দেখলে সাথে সাথে ডেলিভারি ম্যানকে ফেরত দিন অথবা আমাদের হটলাইনে কল দিন।
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
