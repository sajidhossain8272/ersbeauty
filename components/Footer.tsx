import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-300 w-full pt-12 pb-6 mt-auto">
      {/* Tier 1: Columns */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-8 pb-10 border-b border-gray-800">
        
        {/* Column 1: About Us */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo Icon */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-blue-800 shadow-md shadow-brand-blue/10">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C12 2 19 8 19 13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13C5 8 12 2 12 2Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 6c0 0-3 3-3 5.5s1.34 4.5 3 4.5 3-2 3-4.5S12 6 12 6z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
              ers<span className="text-brand-blue">beauty</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            ঢাকার সবচেয়ে নির্ভরযোগ্য প্রিমিয়াম প্রসাধনী এবং স্কিনকেয়ার রিটেইলার। আমরা সরাসরি অরিজিনাল ব্র্যান্ডের পণ্য আমদানি করে আপনাদের কাছে পৌঁছে দিই।
          </p>
          <div className="flex items-center gap-3 mt-2 text-gray-400">
            <a href="#" className="hover:text-brand-blue transition-colors duration-150" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="#" className="hover:text-brand-blue transition-colors duration-150" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="hover:text-brand-blue transition-colors duration-150" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Customer Policies */}
        <div>
          <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider">Customer Policies</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">Privacy Policy (গোপনীয়তা নীতি)</Link></li>
            <li><Link href="/return-policy" className="hover:text-white hover:underline transition-colors">Return Policy (রিটার্ন নীতি)</Link></li>
          </ul>
        </div>

      </div>

      {/* Tier 2: Copyright & Payments */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div>
          &copy; {new Date().getFullYear()} ersbeauty Bangladesh. All rights reserved. Registered under skincare authority.
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-brand-blue" /> Verified Authentic</span>
          <span className="flex items-center gap-1"><CreditCard size={14} className="text-brand-blue" /> Cash on Delivery / bKash / Cards</span>
        </div>
      </div>
    </footer>
  );
}
