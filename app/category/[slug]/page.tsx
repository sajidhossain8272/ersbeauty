import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductsData, Product } from '@/lib/db';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Flame, 
  Sparkles, 
  Droplet, 
  Scissors, 
  Pill, 
  Smile, 
  Star 
} from 'lucide-react';

interface CategoryDetails {
  name: string;
  banglaName: string;
  icon: React.ComponentType<any>;
  color: string;
  filter: (product: Product) => boolean;
}

const CATEGORY_MAP: Record<string, CategoryDetails> = {
  'brands': {
    name: 'Brands',
    banglaName: 'আমাদের ব্র্যান্ডস',
    icon: Sparkles,
    color: 'text-purple-500',
    filter: (p) => p.brand === 'Dr. Yunmei'
  },
  'skin-care': {
    name: 'Skin Care',
    banglaName: 'স্কিন কেয়ার',
    icon: Droplet,
    color: 'text-brand-blue',
    filter: (p) => p.category?.toLowerCase() === 'skin care'
  },
  'hair-care': {
    name: 'Hair Care',
    banglaName: 'হেয়ার কেয়ার',
    icon: Scissors,
    color: 'text-amber-600',
    filter: (p) => p.category?.toLowerCase() === 'hair care'
  },
  'supplement': {
    name: 'Supplement',
    banglaName: 'সাপ্লিমেন্ট',
    icon: Pill,
    color: 'text-emerald-500',
    filter: (p) => p.category?.toLowerCase() === 'supplement'
  },
  'makeup': {
    name: 'Makeup',
    banglaName: 'মেকআপ',
    icon: Smile,
    color: 'text-rose-500',
    filter: (p) => p.category?.toLowerCase() === 'makeup'
  },
  'special-offer': {
    name: 'Special Offer',
    banglaName: 'স্পেশাল অফার',
    icon: Flame,
    color: 'text-brand-red',
    filter: (p) => p.price < p.originalPrice
  }
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];
  if (!category) {
    return {
      title: 'Category Not Found | ersbeauty',
    };
  }
  return {
    title: `${category.name} - ${category.banglaName} | ersbeauty Bangladesh`,
    description: `Explore premium, 100% authentic ${category.name} beauty & skincare products at ersbeauty Bangladesh. Genuine products, cash on delivery.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    notFound();
  }

  const allProducts = getProductsData();
  const filteredProducts = allProducts.filter(category.filter);
  const IconComp = category.icon;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Header />

      {/* Category Header Banner */}
      <section className="relative bg-gradient-to-br from-[#FFF0F2] via-[#FFE5E8] to-[#FFF0F2] text-gray-900 overflow-hidden py-12 md:py-16 border-b border-pink-100">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[250px] h-[250px] bg-brand-blue/5 rounded-full blur-[60px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-md select-none">
              <IconComp size={24} className={category.color} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {category.name} ({category.banglaName})
            </h1>
            <p className="text-sm text-gray-600 font-semibold max-w-lg leading-relaxed">
              আমাদের {category.banglaName} কালেকশনের প্রিমিয়াম পণ্যসমূহ। সরাসরি অরিজিনাল ব্র্যান্ড থেকে আমদানিকৃত ১০০% জেনুইন প্রোডাক্ট।
            </p>
          </div>
        </div>
      </section>

      {/* Global Trust Banner */}
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

      {/* Catalog Products Grid */}
      <section id="products-section" className="max-w-7xl w-full mx-auto px-4 py-16 md:py-20">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)</h3>
            <p className="text-sm text-gray-500 font-semibold mb-6">
              দুঃখিত, এই ক্যাটাগরির সাথে সামঞ্জস্যপূর্ণ কোনো প্রোডাক্ট আমাদের স্টোরে এই মুহূর্তে নেই।
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
                  className="bg-white rounded-3xl border border-gray-150 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
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

      <Footer />
    </div>
  );
}
