'use client';

import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Flame, ShieldAlert, Award, PhoneCall, Truck, Sparkles } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '@/context/CartContext';

interface PurchasePanelProps {
  id?: string;
  slug?: string;
  imageUrl?: string;
  brand?: string;
  price: number;
  originalPrice: number;
  saveAmount: number;
  discountPercent: number;
  stockStatus: string;
  isAuthentic: boolean;
  productName: string;
}

export default function PurchasePanel({
  id = 'dr-yunmei-collagen-anti-wrinkle-cream',
  slug = 'dr-yunmei-collagen-anti-wrinkle-cream',
  imageUrl = '/images/collagen-cream.png',
  brand = 'Dr. Yunmei',
  price,
  originalPrice,
  saveAmount,
  discountPercent,
  stockStatus,
  isAuthentic,
  productName
}: PurchasePanelProps) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'dhaka' // 'dhaka' | 'outside'
  });
  const [cartSuccess, setCartSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const totalPrice = price * quantity;
  const isOutOfStock = stockStatus.toLowerCase().includes('out of stock') || stockStatus.includes('স্টক শেষ');
  const isFreeDelivery = checkoutData.area === 'dhaka' && totalPrice >= 1500;
  const deliveryCharge = isFreeDelivery ? 0 : (checkoutData.area === 'dhaka' ? 80 : 120);
  const grandTotal = totalPrice + deliveryCharge;

  const handleAddToCart = () => {
    addToCart({
      id,
      slug,
      name: productName,
      price,
      imageUrl,
      brand
    }, quantity);
    
    setCartSuccess(true);
    setTimeout(() => {
      setCartSuccess(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart({
      id,
      slug,
      name: productName,
      price,
      imageUrl,
      brand
    }, quantity);
    openCart();
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) {
      alert('দয়া করে সব তথ্য পূরণ করুন।');
      return;
    }

    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phoneRegex.test(checkoutData.phone.replace(/\s+/g, ''))) {
      alert('দয়া করে একটি সঠিক মোবাইল নাম্বার ব্যবহার করুন (যেমন: 017XXXXXXXX)।');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: checkoutData,
          items: [{
            id,
            name: productName,
            price,
            quantity,
            brand
          }],
          deliveryCharge,
          totalAmount: grandTotal,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPlacedOrderId(data.orderId);
        setOrderPlaced(true);
      } else {
        alert(data.message || 'অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('সার্ভারে যোগাযোগ করতে সমস্যা হচ্ছে। ইন্টারনেট চেক করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      {/* 1. Urgency & Trust Badges */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-brand-red text-xs font-black animate-pulse">
          <Flame size={14} className="fill-brand-red" />
          <span>🔥 {stockStatus}</span>
        </div>
        {isAuthentic && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-extrabold">
            <Award size={14} className="fill-emerald-100" />
            <span>🛡️ Authenticity guaranteed (১০০% অরিজিনাল প্রোডাক্ট)</span>
          </div>
        )}
      </div>

      {/* 2. Pricing block */}
      <div className="border-t border-b border-gray-100 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-brand-blue">
              ৳{price.toLocaleString()}
            </span>
            <span className="text-base font-bold text-gray-400 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Cash on Delivery available all over Bangladesh</p>
        </div>
        
        {/* Discount/Save Tag */}
        <div className="flex flex-col items-end gap-1">
          <span className="bg-brand-red text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
          <span className="text-xs font-bold text-brand-red bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-md">
            Save ৳{saveAmount}
          </span>
        </div>
      </div>

      {/* 3. Quantity Selector */}
      {!isOutOfStock && <QuantitySelector quantity={quantity} onChange={setQuantity} />}

      {/* 4. Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="w-full py-4 bg-gray-200 text-gray-500 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none"
          >
            <span>স্টক শেষ (Out of Stock)</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>

            {/* Buy Now Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-red/15 hover:shadow-brand-red/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none"
            >
              <Sparkles size={18} className="fill-white" />
              <span>Buy Now (অর্ডার করুন)</span>
            </button>
          </div>
        )}
      </div>

      {/* Add to Cart Toast Success */}
      {cartSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2 animate-slideDown">
          <CheckCircle size={15} className="text-emerald-600" />
          <span>Product added to cart! Proceed to checkout using the "Buy Now" button.</span>
        </div>
      )}

      {/* 5. Checkout / Quick Order Form (Cash on Delivery) */}
      {showCheckoutForm && !orderPlaced && (
        <div id="checkout-section" className="border-t-2 border-dashed border-gray-200 pt-6 mt-4 animate-slideDown">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-150 space-y-4">
            <div className="text-center pb-2">
              <h3 className="text-lg font-black text-gray-800">অর্ডার কনফার্ম করুন</h3>
              <p className="text-xs font-semibold text-gray-500 mt-1">পণ্য হাতে পেয়ে টাকা পরিশোধ করুন (ক্যাশ অন ডেলিভারি)</p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-gray-600">আপনার নাম (Full Name)*</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাকিব হোসেন"
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-gray-600">মোবাইল নাম্বার (Mobile Number)*</label>
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX"
                  value={checkoutData.phone}
                  onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-gray-600">পূর্ণ ঠিকানা (Full Delivery Address)*</label>
                <textarea
                  required
                  rows={2}
                  placeholder="বাসা নাম্বার, রোড নাম্বার, এলাকা, থানা..."
                  value={checkoutData.address}
                  onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>

              {/* Area (Delivery Zone) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-gray-600">ডেলিভারি এলাকা (Delivery Zone)</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    checkoutData.area === 'dhaka' 
                      ? 'border-brand-blue bg-blue-50/50 text-brand-blue font-bold' 
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="area"
                      value="dhaka"
                      checked={checkoutData.area === 'dhaka'}
                      onChange={() => setCheckoutData({ ...checkoutData, area: 'dhaka' })}
                      className="sr-only"
                    />
                    <span className="text-xs sm:text-sm">ঢাকা সিটি (৳৮০)</span>
                  </label>

                  <label className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    checkoutData.area === 'outside' 
                      ? 'border-brand-blue bg-blue-50/50 text-brand-blue font-bold' 
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="area"
                      value="outside"
                      checked={checkoutData.area === 'outside'}
                      onChange={() => setCheckoutData({ ...checkoutData, area: 'outside' })}
                      className="sr-only"
                    />
                    <span className="text-xs sm:text-sm">ঢাকার বাইরে (৳১২০)</span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white border border-gray-150 p-4 rounded-xl space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between font-medium">
                  <span>Product Price ({quantity} qty):</span>
                  <span className="font-bold text-gray-900">৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Delivery Charge:</span>
                  <span className="font-bold text-gray-900">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-gray-100 pt-2.5 text-gray-900">
                  <span className="text-brand-blue">সর্বমোট (Total):</span>
                  <span className="text-brand-blue">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Order */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10 cursor-pointer transition-colors duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall size={16} />
                    <span>অর্ডার নিশ্চিত করুন (Confirm Order)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Success Modal */}
      {orderPlaced && (
        <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-4 text-center space-y-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle size={36} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">অর্ডার সফল হয়েছে!</h3>
            <p className="text-sm font-medium text-gray-500 mt-2 px-2 leading-relaxed">
              ধন্যবাদ <strong>{checkoutData.name}</strong>, আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। 
              আমাদের প্রতিনিধি শীঘ্রই আপনার নাম্বারে (<strong>{checkoutData.phone}</strong>) কল করে অর্ডারটি কনফার্ম করবেন।
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-left max-w-sm mx-auto text-xs text-emerald-800 space-y-1.5 font-bold">
            {placedOrderId && <p className="text-brand-blue font-extrabold">🆔 অর্ডার আইডি: {placedOrderId}</p>}
            <p>📦 প্রোডাক্ট: {productName}</p>
            <p>🔢 পরিমাণ: {quantity} টি</p>
            <p>📍 ডেলিভারি ঠিকানা: {checkoutData.address}</p>
            <p>💰 সর্বমোট বিল: ৳{grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)</p>
          </div>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setShowCheckoutForm(false);
            }}
            className="text-xs text-brand-blue font-bold hover:underline"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      )}
    </div>
  );
}
