"use client";

import React from "react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/8801405892234";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end group">
      {/* Tooltip text */}
      <span className="mb-2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
        হোয়াটসঅ্যাপ সাপোর্ট (+880 1405-892234)
      </span>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="WhatsApp Support"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 relative z-10"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.456 5.429 1.457 5.432 0 9.849-4.417 9.853-9.853.002-2.632-1.02-5.107-2.883-6.97C17.176 1.875 14.7 1.85 12.005 1.85c-5.43 0-9.848 4.418-9.853 9.853-.001 1.936.506 3.826 1.466 5.425l-.993 3.63 3.733-.98c1.558.85 3.3 1.298 5.099 1.298zM17.07 14.18c-.276-.138-1.636-.807-1.89-.9-.253-.093-.437-.138-.62.138-.184.277-.714.9-.875 1.084-.162.184-.323.207-.6.069-.276-.138-1.168-.43-2.226-1.374-.823-.733-1.378-1.64-1.54-1.916-.162-.276-.017-.425.121-.562.124-.123.276-.323.415-.483.138-.161.184-.276.277-.46.093-.184.046-.346-.023-.483-.069-.138-.62-1.493-.849-2.046-.223-.538-.468-.464-.639-.473-.162-.01-.347-.01-.532-.01-.184 0-.485.07-.738.346-.254.276-.97.947-.97 2.308 0 1.36.99 2.673 1.128 2.857.138.184 1.947 2.973 4.717 4.167.659.284 1.173.454 1.575.582.662.21 1.263.18 1.739.11.53-.08 1.636-.67 1.868-1.316.232-.647.232-1.2.162-1.316-.069-.115-.253-.184-.53-.322z" />
        </svg>
      </a>
    </div>
  );
}
