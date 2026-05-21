'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { Product } from '@/lib/db';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, cartCount } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/assets/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Error fetching search products:', err));
  }, []);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
    setSearchResults(filtered);
    setShowDropdown(true);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const isInsideDesktop = desktopSearchRef.current?.contains(e.target as Node);
      const isInsideMobile = mobileSearchRef.current?.contains(e.target as Node);
      if (!isInsideDesktop && !isInsideMobile) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    } else {
      router.push('/');
    }
  };

  const categories = [
    { name: 'Brands', slug: 'brands', icon: Sparkles, color: 'text-purple-500' },
    { name: 'Skin Care', slug: 'skin-care', icon: Droplet, color: 'text-brand-blue' },
    { name: 'Hair Care', slug: 'hair-care', icon: Scissors, color: 'text-amber-600' },
    { name: 'Supplement', slug: 'supplement', icon: Pill, color: 'text-emerald-500' },
    { name: 'Makeup', slug: 'makeup', icon: Smile, color: 'text-rose-500' },
    { name: 'Special Offer', slug: 'special-offer', icon: Flame, color: 'text-brand-red', badge: 'Hot' },
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
            <a href="tel:+8801405892234" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              <Phone size={13} className="text-gray-400 animate-pulse" />
              Support: +880 1405-892234
            </a>
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
        <div ref={desktopSearchRef} className="hidden md:flex flex-1 max-w-xl mx-auto relative z-50">
          <form onSubmit={handleSearchSubmit} className="w-full flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search skincare, cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setShowDropdown(true);
                }}
                className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-gray-50"
              />
              <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
            </div>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 rounded-r-lg text-sm font-semibold transition-colors duration-200">
              Search
            </button>
          </form>
          
          {/* Dropdown Container */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-[9999]">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => {
                    setShowDropdown(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50/50 border-b border-gray-50 last:border-0 transition-colors cursor-pointer"
                >
                  <div className="relative w-10 h-10 shrink-0 bg-gray-50 rounded overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-contain w-full h-full p-0.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-brand-blue uppercase tracking-wider">{product.brand}</p>
                    <p className="text-xs font-bold text-gray-800 truncate leading-snug">{product.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-brand-blue">৳{product.price}</p>
                    {product.price < product.originalPrice && (
                      <p className="text-[10px] font-bold text-gray-400 line-through">৳{product.originalPrice}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {showDropdown && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-center text-xs font-bold text-gray-500 z-[9999]">
              কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)
            </div>
          )}
        </div>

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
      <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 relative z-40">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
              setShowDropdown(false);
            } else {
              router.push('/');
            }
          }} 
          className="w-full"
        >
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search skincare, cosmetics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim()) setShowDropdown(true);
              }}
              className="w-full px-4 py-2 pl-9 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-brand-blue bg-gray-50"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
          </div>
        </form>
        {/* Mobile Dropdown Container */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[9999]">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => {
                  setShowDropdown(false);
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 p-2.5 hover:bg-blue-50/50 border-b border-gray-50 last:border-0 transition-colors cursor-pointer"
              >
                <div className="relative w-8 h-8 shrink-0 bg-gray-50 rounded overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain w-full h-full p-0.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-brand-blue uppercase tracking-wider">{product.brand}</p>
                  <p className="text-[10px] font-bold text-gray-800 truncate leading-snug">{product.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-black text-brand-blue">৳{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {showDropdown && searchResults.length === 0 && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-center text-[10px] font-bold text-gray-500 z-[9999]">
            কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)
          </div>
        )}
      </div>

      {/* 3. Horizontal Scrollable Category Navigation */}
      <div className="w-full border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto hide-scrollbar gap-8 py-3.5 scroll-smooth">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
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
                href={`/category/${cat.slug}`}
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
