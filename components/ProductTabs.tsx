'use client';

import React from 'react';
import { FileText, ClipboardList, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface TabHighlight {
  title: string;
  description: string;
  imageUrl?: string;
}

interface ProductTabsProps {
  id?: string;
  description: string;
  ingredients: string[];
  highlights: TabHighlight[];
  brand: string;
  name: string;
}

export default function ProductTabs({ id, description, ingredients, highlights, brand, name }: ProductTabsProps) {
  // Dynamic Bengali marketing text based on product ID
  const isEyeCream = id === 'ersbeauty-collagen-eye-cream';
  const isEssence = id === 'ersbeauty-collagen-brightening-essence';

  const marketingTitle = isEyeCream 
    ? 'কেন এই কোলাজেন আই ক্রিমটি বেছে নেবেন?' 
    : isEssence 
      ? 'কেন এই কোলাজেন ব্রাইটেনিং এসেন্সটি বেছে নেবেন?' 
      : 'কেন এই কোলাজেন ক্রিমটি বেছে নেবেন?';

  const marketingBullets = isEyeCream
    ? [
        "চোখের চারপাশের কালো দাগ বা ডার্ক সার্কেল দ্রুত দূর করে।",
        "চোখের নিচের চামড়া কুঁচকে যাওয়া রোধ করে ত্বক টানটান রাখে।",
        "খাঁটি সোনার কণা চোখের চারপাশের ত্বক সতেজ ও উজ্জ্বল রাখে।",
        "দ্রুত শোষিত হয় এবং চোখের নিচের ক্লান্ত ভাব দূর করতে সাহায্য করে।"
      ]
    : isEssence
      ? [
          "ত্বকের গভীরে পুষ্টি জুগিয়ে রুক্ষতা দূর করে কোমল করে তোলে।",
          "ত্বকের কালো দাগ হালকা করে আকর্ষণীয় গ্লাস স্কিন গ্লো এনে দেয়।",
          "কোলাজেন পেপটাইড ত্বকের ইলাস্টিসিটি বৃদ্ধি করে তারুণ্য ধরে রাখে।",
          "নিয়াসিনামাইড ও খাঁটি সোনার কণা ত্বককে ভেতর থেকে ফর্সা ও ব্রাইট করে।"
        ]
      : [
          "ত্বকের বলিরেখা এবং ফাইন লাইনস দ্রুত দূর করে স্কিন টানটান করে।",
          "খাঁটি সোনার কণা (Gold Particles) ত্বককে দেয় তাৎক্ষণিক ন্যাচারাল গ্লো।",
          "রিকম্বিন্যান্ট কোলাজেন ত্বকের ইলাস্টিসিটি বৃদ্ধি করে চামড়া ঝুলে যাওয়া রোধ করে।",
          "গরমের জন্য খুবই লাইটওয়েট এবং নন-গ্রীসি ফর্মুলা, যা চিটচিটে ভাব দেয় না।"
        ];

  const usageInstructions = isEyeCream
    ? "প্রতিদিন রাতে মুখ ভালো করে ধুয়ে নেওয়ার পর পর্যাপ্ত পরিমাণে আই ক্রিম নিয়ে চোখের চারপাশে আলতো করে ড্যাব করে মেখে নিন। জোরে ঘষবেন না। নিয়মিত ব্যবহারে ভালো ফল পাওয়া যাবে।"
    : isEssence
      ? "মুখ ধুয়ে টোনার ব্যবহারের পর ২-৩ ফোঁটা এসেন্স নিয়ে পুরো মুখে হালকা হাতে মেখে নিন এবং শোষিত হতে দিন। এরপর আপনার পছন্দের ময়েশ্চারাইজার ব্যবহার করুন। সকালে ও রাতে ব্যবহার করতে পারেন।"
      : "প্রতিদিন সকালে ও রাতে ফেসওয়াশ বা ক্লিনজার দিয়ে মুখ ভালো করে ধুয়ে নিন। এরপর পর্যাপ্ত পরিমাণে ক্রিম নিয়ে পুরো মুখে এবং গলায় আলতো হাতে বৃত্তাকার মোশনে ম্যাসাজ করে মিশিয়ে দিন। ভালো ফলাফলের জন্য নিয়মিত দিনে ২ বার ব্যবহার করুন।";

  return (
    <div className="w-full space-y-12 mt-16">
      
      {/* 1. Description & Highlights Section */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
          <FileText className="text-brand-blue" size={20} />
          <span>Description (বিস্তারিত বিবরণ)</span>
        </h3>
        
        <div className="space-y-8">
          {/* Main paragraph */}
          <div className="prose max-w-none">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {highlight.imageUrl ? (
                  <div className="relative w-full h-64 overflow-hidden bg-white border-b border-gray-100 flex items-center justify-center">
                    <Image 
                      src={highlight.imageUrl}
                      alt={highlight.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-5 pb-0">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      <Sparkles size={18} />
                    </div>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base mb-1.5">{highlight.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Marketing copy in Bengali */}
          <div className="border-t border-gray-150 pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-gray-800">{marketingTitle}</h3>
              <ul className="space-y-3">
                {marketingBullets.map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-black text-gray-800">ব্যবহারের নিয়ম (How to Use)</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {usageInstructions}
              </p>
              <div className="bg-yellow-50 border border-yellow-200/50 p-4 rounded-xl text-xs text-yellow-800 font-semibold">
                ⚠️ সতর্কতা: শুধুমাত্র বাহ্যিক ব্যবহারের জন্য। চোখে লাগলে জল দিয়ে ধুয়ে ফেলুন। শিশুদের নাগালের বাইরে রাখুন।
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Specifications Section */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
          <ClipboardList className="text-brand-blue" size={20} />
          <span>Specifications (প্রোডাক্টের বিবরণ ও তথ্য)</span>
        </h3>
        
        <div className="max-w-2xl overflow-hidden rounded-xl border border-gray-150">
          <table className="w-full text-left border-collapse text-sm">
            <tbody>
              {[
                { label: 'Product Name', value: name },
                { label: 'Brand', value: brand },
                { label: 'Volume (Net)', value: isEyeCream ? '30g' : isEssence ? '40ml' : '50g' },
                { label: 'Skin Type', value: 'All skin types, especially aging & dry skin (সব ধরণের ত্বকের জন্য)' },
                { label: 'Origin', value: 'China (চীন)' },
                { label: 'Key Ingredients', value: ingredients.join(', ') },
                { label: 'Authenticity', value: '100% Genuine product guaranteed (QR Verification code included)' },
              ].map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                >
                  <td className="py-4 px-5 font-bold text-gray-900 w-1/3 border-r border-gray-100">{row.label}</td>
                  <td className="py-4 px-5 text-gray-700 font-semibold">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Shipping & Return Section */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
          <Truck className="text-brand-blue" size={20} />
          <span>Shipping & Return Policy (ডেলিভারি ও রিটার্ন পলিসি)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-150 p-6 rounded-xl space-y-3 bg-gray-50/50">
            <h4 className="font-extrabold text-gray-900 text-base">শিপিং পলিসি (Shipping Policy)</h4>
            <ul className="space-y-2 text-sm text-gray-600 font-medium">
              <li className="flex justify-between border-b border-gray-100 pb-1.5">
                <span>ঢাকা সিটির ভেতরে:</span>
                <span className="font-bold text-gray-900">৳৮০ (১-২ দিন)</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-1.5">
                <span>ঢাকা সিটির বাইরে:</span>
                <span className="font-bold text-gray-900">৳১২০ (২-৩ দিন)</span>
              </li>
              <li className="flex justify-between text-brand-blue font-bold">
                <span>ফ্রি ডেলিভারি অফার:</span>
                <span>৳১,৫০০+ অর্ডারে ফ্রি ডেলিভারি!</span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 pt-2 leading-relaxed">
              * আমরা সারাদেশে অত্যন্ত সতর্কতার সাথে ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা প্রদান করে থাকি।
            </p>
          </div>

          <div className="border border-gray-150 p-6 rounded-xl space-y-3 bg-gray-50/50">
            <h4 className="font-extrabold text-gray-900 text-base">রিটার্ন ও রিফান্ড (Return & Refund)</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              পণ্য হাতে পাওয়ার পর যদি কোনো সমস্যা দেখতে পান (যেমন: ড্যামেজ বা ভুল প্রোডাক্ট), তবে ২৪ ঘণ্টার মধ্যে আমাদের সাপোর্ট লাইনে যোগাযোগ করুন।
            </p>
            <ul className="space-y-1.5 text-xs text-gray-500 list-disc list-inside leading-relaxed">
              <li>প্রোডাক্ট সম্পূর্ণ অব্যবহৃত ও ইনট্যাক্ট থাকতে হবে।</li>
              <li>সিকিউরিটি বারকোড বা কিউআর কোড স্ক্র্যাচ করা হওয়া যাবে না।</li>
              <li>ডেলিভারির সময় পাওয়া মেমোটি সাথে রাখতে হবে।</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
