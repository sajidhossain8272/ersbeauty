'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Droplet, 
  Flame, 
  Pill, 
  Scissors, 
  Smile, 
  Menu, 
  X,
  Phone,
  ShieldCheck,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useCart } from '@/context/CartContext';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, cartCount } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  const categories = [
    { name: 'Brands', icon: Sparkles, color: 'text-purple-500' },
    { name: 'Skin Care', icon: Droplet, color: 'text-brand-blue' },
    { name: 'Hair Care', icon: Scissors, color: 'text-amber-600' },
    { name: 'Supplement', icon: Pill, color: 'text-emerald-500' },
    { name: 'Makeup', icon: Smile, color: 'text-rose-500' },
    { name: 'Special Offer', icon: Flame, color: 'text-brand-red', badge: 'Hot' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* 1. Top Announcement Bar (Clean White) */}
      <div className="w-full border-b border-gray-100 bg-gray-50 py-2 px-4 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-brand-blue" />
              Free shipping in Dhaka on orders above ৳1,500
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              100% Authentic Skincare Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={13} className="text-gray-400" />
              Support: +880 1977-889900
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="text-brand-blue font-medium hover:underline cursor-pointer">Track Order</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 select-none group">
          {/* Logo Icon (Left) */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-blue-800 shadow-md shadow-brand-blue/10 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C12 2 19 8 19 13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13C5 8 12 2 12 2Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M12 6c0 0-3 3-3 5.5s1.34 4.5 3 4.5 3-2 3-4.5S12 6 12 6z" fill="white" />
            </svg>
          </div>
          {/* Logo Typography (Right) */}
          <span className="text-xl font-black tracking-tight text-gray-900 font-sans">
            ers<span className="text-brand-blue">beauty</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-auto relative">
          <div className="w-full flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search skincare, cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-gray-50"
              />
              <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
            </div>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 rounded-r-lg text-sm font-semibold transition-colors duration-200">
              Search
            </button>
          </div>
        </form>

        {/* Right side icons */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="p-2 text-gray-600 hover:text-brand-blue relative transition-colors duration-150 cursor-pointer">
            <Heart size={22} />
            <span className="absolute top-0.5 right-0.5 bg-brand-red text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          
          <button 
            onClick={openCart}
            className="p-2 text-gray-600 hover:text-brand-blue relative transition-colors duration-150 cursor-pointer"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-brand-blue text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-brand-blue md:hidden transition-colors duration-150"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
          } else {
            router.push('/');
          }
        }} 
        className="md:hidden px-4 pb-3"
      >
        <div className="relative w-full flex">
          <input
            type="text"
            placeholder="Search skincare, cosmetics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-9 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-brand-blue bg-gray-50"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
        </div>
      </form>

      {/* 3. Horizontal Scrollable Category Navigation */}
      <div className="w-full border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto hide-scrollbar gap-8 py-3.5 scroll-smooth">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-gray-700 hover:text-brand-blue transition-colors duration-150 group cursor-pointer"
                >
                  <IconComp size={16} className={`${cat.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="bg-brand-red text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold animate-bounce">
                      {cat.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3 absolute top-full left-0 w-full shadow-lg z-50">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skincare Navigation</p>
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={idx}
                href={`/?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm font-semibold text-gray-700 hover:text-brand-blue border-b border-gray-50 text-left w-full cursor-pointer"
              >
                <IconComp size={18} className={cat.color} />
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="bg-brand-red text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {cat.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
