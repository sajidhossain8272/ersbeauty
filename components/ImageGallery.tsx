'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  discountPercent: number;
}

export default function ImageGallery({ images, productName, discountPercent }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || !images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Wrapper */}
      <div className="relative aspect-square w-full bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden group shadow-sm flex items-center justify-center">
        {/* Floating Discount Badge */}
        <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-red/20 transform -rotate-3 select-none animate-pulse">
          -{discountPercent}% OFF
        </div>

        {/* Main Product Image */}
        <div className="relative w-full h-full p-2">
          <Image
            src={images[activeIndex]}
            alt={`${productName} - View ${activeIndex + 1}`}
            fill
            priority
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 500px"
          />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2 select-none">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square rounded-xl overflow-hidden relative bg-gray-50 p-1 cursor-pointer transition-all ${
                isActive 
                  ? 'border-2 border-brand-blue shadow-md scale-95' 
                  : 'border border-gray-200 hover:border-brand-blue/50'
              }`}
            >
              <Image 
                src={img} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                className="object-contain p-0.5" 
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
