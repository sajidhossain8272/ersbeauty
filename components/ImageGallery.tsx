'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
  discountPercent: number;
}

export default function ImageGallery({ images, videos = [], productName, discountPercent }: ImageGalleryProps) {
  // Items array containing both images and videos
  type MediaItem = { type: 'image'; src: string } | { type: 'video'; src: string; label: string };

  const mediaItems: MediaItem[] = [
    ...images.map(img => ({ type: 'image' as const, src: img })),
    ...videos.map((vid, idx) => ({ type: 'video' as const, src: vid, label: `ভিডিও ${idx + 1}` }))
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = mediaItems[activeIndex] || mediaItems[0];

  if (!mediaItems.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Showcase Wrapper */}
      <div className="relative aspect-square w-full bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden group shadow-sm flex items-center justify-center">
        {/* Floating Discount Badge */}
        <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-red/20 transform -rotate-3 select-none animate-pulse">
          -{discountPercent}% OFF
        </div>

        {/* Video or Image Switch indicator */}
        {videos.length > 0 && (
          <div className="absolute top-4 right-4 z-10 flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                const firstVideoIdx = mediaItems.findIndex(m => m.type === 'video');
                if (firstVideoIdx !== -1) setActiveIndex(firstVideoIdx);
              }}
              className={`text-[11px] font-black px-2.5 py-1 rounded-full border shadow-sm transition-all flex items-center gap-1 ${
                activeItem.type === 'video'
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white/90 text-gray-700 hover:bg-white border-gray-200'
              }`}
            >
              <span>▶ ভিডিও দেখুন</span>
            </button>
          </div>
        )}

        {/* Main Product Media Display */}
        {activeItem.type === 'video' ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              key={activeItem.src}
              src={activeItem.src}
              controls
              autoPlay
              playsInline
              loop
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="relative w-full h-full p-2">
            <Image
              src={activeItem.src}
              alt={`${productName} - View ${activeIndex + 1}`}
              fill
              priority
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        )}
      </div>

      {/* Thumbnail Gallery (Images + Videos) */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 select-none">
        {mediaItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          if (item.type === 'video') {
            return (
              <button
                key={`video-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`aspect-square rounded-xl overflow-hidden relative bg-gray-900 p-1 cursor-pointer transition-all flex flex-col items-center justify-center text-white ${
                  isActive
                    ? 'border-2 border-brand-blue shadow-md scale-95 ring-2 ring-brand-blue/30'
                    : 'border border-gray-300 hover:border-brand-blue/60'
                }`}
                title={`Play ${item.label}`}
              >
                <div className="w-7 h-7 rounded-full bg-brand-blue/90 flex items-center justify-center text-white mb-1 shadow">
                  <span className="text-xs">▶</span>
                </div>
                <span className="text-[9px] font-black tracking-tight">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={`img-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square rounded-xl overflow-hidden relative bg-gray-50 p-1 cursor-pointer transition-all ${
                isActive 
                  ? 'border-2 border-brand-blue shadow-md scale-95' 
                  : 'border border-gray-200 hover:border-brand-blue/50'
              }`}
            >
              <Image 
                src={item.src} 
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
