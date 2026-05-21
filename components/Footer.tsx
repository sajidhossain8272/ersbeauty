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
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 pb-10 border-b border-gray-800">
        
        {/* Column 1: About Us */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center shrink-0 select-none group">
            <img 
              src="/logo.png" 
              alt="ersbeauty" 
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            ঢাকার সবচেয়ে নির্ভরযোগ্য প্রিমিয়াম প্রসাধনী এবং স্কিনকেয়ার রিটেইলার। আমরা সরাসরি অরিজিনাল ব্র্যান্ডের পণ্য আমদানি করে আপনাদের কাছে পৌঁছে দিই।
          </p>
          <div className="flex items-center gap-4.5 mt-1 text-gray-400">
            <a 
              href="https://www.facebook.com/profile.php?id=61576467003503" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors duration-150" 
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a 
              href="https://wa.me/8801405892234" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors duration-150" 
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.456 5.429 1.457 5.432 0 9.849-4.417 9.853-9.853.002-2.632-1.02-5.107-2.883-6.97C17.176 1.875 14.7 1.85 12.005 1.85c-5.43 0-9.848 4.418-9.853 9.853-.001 1.936.506 3.826 1.466 5.425l-.993 3.63 3.733-.98c1.558.85 3.3 1.298 5.099 1.298zM17.07 14.18c-.276-.138-1.636-.807-1.89-.9-.253-.093-.437-.138-.62.138-.184.277-.714.9-.875 1.084-.162.184-.323.207-.6.069-.276-.138-1.168-.43-2.226-1.374-.823-.733-1.378-1.64-1.54-1.916-.162-.276-.017-.425.121-.562.124-.123.276-.323.415-.483.138-.161.184-.276.277-.46.093-.184.046-.346-.023-.483-.069-.138-.62-1.493-.849-2.046-.223-.538-.468-.464-.639-.473-.162-.01-.347-.01-.532-.01-.184 0-.485.07-.738.346-.254.276-.97.947-.97 2.308 0 1.36.99 2.673 1.128 2.857.138.184 1.947 2.973 4.717 4.167.659.284 1.173.454 1.575.582.662.21 1.263.18 1.739.11.53-.08 1.636-.67 1.868-1.316.232-.647.232-1.2.162-1.316-.069-.115-.253-.184-.53-.322z"/>
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

        {/* Column 3: Contact & Address */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider">Contact & Address</h3>
          <div className="flex items-start gap-2.5 text-sm text-gray-400">
            <svg className="w-5 h-5 text-brand-blue mt-0.5 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.456 5.429 1.457 5.432 0 9.849-4.417 9.853-9.853.002-2.632-1.02-5.107-2.883-6.97C17.176 1.875 14.7 1.85 12.005 1.85c-5.43 0-9.848 4.418-9.853 9.853-.001 1.936.506 3.826 1.466 5.425l-.993 3.63 3.733-.98c1.558.85 3.3 1.298 5.099 1.298zM17.07 14.18c-.276-.138-1.636-.807-1.89-.9-.253-.093-.437-.138-.62.138-.184.277-.714.9-.875 1.084-.162.184-.323.207-.6.069-.276-.138-1.168-.43-2.226-1.374-.823-.733-1.378-1.64-1.54-1.916-.162-.276-.017-.425.121-.562.124-.123.276-.323.415-.483.138-.161.184-.276.277-.46.093-.184.046-.346-.023-.483-.069-.138-.62-1.493-.849-2.046-.223-.538-.468-.464-.639-.473-.162-.01-.347-.01-.532-.01-.184 0-.485.07-.738.346-.254.276-.97.947-.97 2.308 0 1.36.99 2.673 1.128 2.857.138.184 1.947 2.973 4.717 4.167.659.284 1.173.454 1.575.582.662.21 1.263.18 1.739.11.53-.08 1.636-.67 1.868-1.316.232-.647.232-1.2.162-1.316-.069-.115-.253-.184-.53-.322z"/>
            </svg>
            <div>
              <p className="font-semibold text-gray-300">WhatsApp:</p>
              <a 
                href="https://wa.me/8801405892234" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +880 1405-892234
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-sm text-gray-400">
            <MapPin size={18} className="text-brand-blue mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-300">Address:</p>
              <p>Khilkhet Moddho Para, Ali Market, Dhaka-1229, Bangladesh</p>
            </div>
          </div>
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
