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
  Truck,
  Mail
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
  const [scrolled, setScrolled] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Track scroll position for mobile shrink behaviour
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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
      setMobileMenuOpen(false);
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

  // Ticker messages for mobile top bar
  const tickerMessages = [
    { icon: <Truck size={12} className="text-brand-blue shrink-0" />, text: 'Free shipping in Dhaka on orders above ৳1,500' },
    { icon: <Phone size={12} className="text-gray-400 shrink-0" />, text: 'Support: +880 1405-892234' },
    { icon: <ShieldCheck size={12} className="text-emerald-600 shrink-0" />, text: '100% Authentic Skincare Guaranteed' },
  ];

  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerFade, setTickerFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerFade(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % tickerMessages.length);
        setTickerFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP HEADER (md and above) - sticky
          ════════════════════════════════════════ */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 hidden md:block">
        {/* Desktop Top Announcement Bar */}
        <div className="w-full border-b border-gray-100 bg-gray-50 py-2 px-4 text-xs text-gray-600">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-brand-blue" />
                Free shipping in Dhaka on orders above ৳1,500
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                100% Authentic Skincare Guaranteed
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+8801405892234" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
                <Phone size={13} className="text-gray-400 animate-pulse" />
                Support: +880 1405-892234
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0 select-none">
            <img src="/logo.png" alt="ersbeauty" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Search Bar */}
          <div ref={desktopSearchRef} className="flex-1 max-w-xl mx-auto relative z-50">
            <form onSubmit={handleSearchSubmit} className="w-full flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search skincare, cosmetics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-gray-50"
                />
                <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
              </div>
              <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 rounded-r-lg text-sm font-semibold transition-colors duration-200">
                Search
              </button>
            </form>
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-[9999]">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => { setShowDropdown(false); setSearchQuery(''); }}
                    className="flex items-center gap-3 p-3 hover:bg-pink-50/50 border-b border-gray-50 last:border-0 transition-colors cursor-pointer"
                  >
                    <div className="relative w-10 h-10 shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full p-0.5" />
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
                কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)
              </div>
            )}
          </div>

          {/* Desktop Right Icons */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 text-gray-600 hover:text-brand-blue relative transition-colors duration-150 cursor-pointer">
              <Heart size={22} />
              <span className="absolute top-0.5 right-0.5 bg-brand-red text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
            <button onClick={openCart} className="p-2 text-gray-600 hover:text-brand-blue relative transition-colors duration-150 cursor-pointer">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-blue text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
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
      </header>

      {/* ════════════════════════════════════════
          MOBILE HEADER (below md) — NOT sticky/fixed
          Collapses on scroll via JS class toggling
          ════════════════════════════════════════ */}
      <div className="md:hidden w-full bg-white border-b border-gray-100 z-40">
        {/* Mobile Ticker Bar - single line animated */}
        <div
          className={`w-full bg-gray-50 border-b border-gray-100 overflow-hidden transition-all duration-300 ${
            scrolled ? 'max-h-0 py-0' : 'max-h-10 py-1.5'
          }`}
        >
          <div
            className={`flex items-center justify-center gap-2 px-4 text-[11px] text-gray-600 font-medium transition-opacity duration-300 ${
              tickerFade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {tickerMessages[tickerIdx].icon}
            <span>{tickerMessages[tickerIdx].text}</span>
          </div>
        </div>

        {/* Mobile Logo + Cart + Hamburger row */}
        <div
          className={`flex items-center justify-between px-4 transition-all duration-300 ${
            scrolled ? 'py-1.5' : 'py-3'
          }`}
        >
          <Link href="/" className="flex items-center shrink-0 select-none">
            <img
              src="/logo.png"
              alt="ersbeauty"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-12'}`}
            />
          </Link>

          <div className="flex items-center gap-3">
            <button onClick={openCart} className="p-2 text-gray-600 hover:text-brand-blue relative transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-blue text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-700 hover:text-brand-blue transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          ref={mobileSearchRef}
          className={`overflow-hidden transition-all duration-300 ${
            scrolled ? 'max-h-0' : 'max-h-16 px-4 pb-3'
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="w-full relative flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search skincare, cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
                className="w-full px-4 py-2 pl-9 border border-gray-200 rounded-l-lg text-xs focus:outline-none focus:border-brand-blue bg-gray-50"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
            </div>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-3 rounded-r-lg text-[11px] font-semibold transition-colors">
              Go
            </button>
          </form>
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[9999]">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => { setShowDropdown(false); setSearchQuery(''); }}
                  className="flex items-center gap-2 p-2.5 hover:bg-pink-50/50 border-b border-gray-50 last:border-0 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 shrink-0 bg-gray-50 rounded overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full p-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-wider">{product.brand}</p>
                    <p className="text-[10px] font-bold text-gray-800 truncate leading-snug">{product.name}</p>
                  </div>
                  <p className="text-[10px] font-black text-brand-blue shrink-0">৳{product.price}</p>
                </Link>
              ))}
            </div>
          )}
          {showDropdown && searchResults.length === 0 && (
            <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-center text-[10px] font-bold text-gray-500 z-[9999]">
              কোনো প্রোডাক্ট পাওয়া যায়নি (No Product Found)
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE FULL-SCREEN MENU OVERLAY
          ════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.png" alt="ersbeauty" className="h-12 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Close Menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Search inside menu */}
          <div className="px-5 py-4 border-b border-gray-100">
            <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search skincare, cosmetics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-9 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:border-brand-blue bg-gray-50"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              </div>
              <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-4 rounded-r-lg text-xs font-semibold transition-colors">
                Search
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="flex-1 px-5 py-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Categories</p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, idx) => {
                const IconComp = cat.icon;
                return (
                  <Link
                    key={idx}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3.5 bg-gray-50 hover:bg-pink-50 border border-gray-100 hover:border-brand-blue/20 rounded-xl transition-all"
                  >
                    <IconComp size={20} className={cat.color} />
                    <div>
                      <span className="text-sm font-bold text-gray-800 block">{cat.name}</span>
                      {cat.badge && (
                        <span className="text-[9px] bg-brand-red text-white px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact info at bottom */}
          <div className="border-t border-gray-100 px-5 py-5 bg-gray-50 space-y-3">
            <a href="tel:+8801405892234" className="flex items-center gap-3 text-sm text-gray-700 font-semibold">
              <span className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                <Phone size={15} className="text-brand-blue" />
              </span>
              +880 1405-892234
            </a>
            <a href="mailto:ersbeautybd@gmail.com" className="flex items-center gap-3 text-sm text-gray-700 font-semibold">
              <span className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                <Mail size={15} className="text-brand-blue" />
              </span>
              ersbeautybd@gmail.com
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61576467003503"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-700 font-semibold"
            >
              <span className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-brand-blue fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
                </svg>
              </span>
              ERS Beauty Facebook Page
            </a>
          </div>
        </div>
      )}
    </>
  );
}
