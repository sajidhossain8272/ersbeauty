'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Truck, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart
  } = useCart();

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'dhaka'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any>(null);

  if (!isCartOpen) return null;

  const isFreeDelivery = checkoutData.area === 'dhaka' && cartTotal >= 1500;
  const deliveryCharge = isFreeDelivery ? 0 : (checkoutData.area === 'dhaka' ? 80 : 120);
  const grandTotal = cartTotal + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) {
      alert('দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন।');
      return;
    }

    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phoneRegex.test(checkoutData.phone.replace(/\s+/g, ''))) {
      alert('দয়া করে একটি সঠিক মোবাইল নাম্বার ব্যবহার করুন (যেমন: 017XXXXXXXX)।');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: checkoutData,
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            brand: item.brand
          })),
          deliveryCharge,
          totalAmount: grandTotal,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPlacedOrderDetails({
          orderId: data.orderId,
          name: checkoutData.name,
          phone: checkoutData.phone,
          address: checkoutData.address,
          total: grandTotal,
          items: [...cartItems]
        });
        setOrderPlaced(true);
        clearCart();
      } else {
        alert(data.message || 'অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('সার্ভারে যোগাযোগ করতে সমস্যা হচ্ছে। ইন্টারনেট চেক করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => !isSubmitting && closeCart()}
      />

      {/* Drawer Panel
          - Mobile: full screen (inset-0)
          - Desktop: right-side panel (max-w-md) 
      */}
      <div className="absolute inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-full md:max-w-md bg-white flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-150 flex items-center justify-between bg-gray-50 shrink-0">
          <h2 className="text-base md:text-lg font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-blue" />
            <span>আপনার শপিং ব্যাগ</span>
            {!orderPlaced && cartItems.length > 0 && (
              <span className="text-xs bg-brand-blue text-white px-2 py-0.5 rounded-full font-black">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </h2>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
            onClick={closeCart}
            disabled={isSubmitting}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-5">
          {orderPlaced ? (
            /* ── Success Screen ── */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={36} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-emerald-600">অর্ডারটি সফল হয়েছে!</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার নাম্বারে কল করবেন।
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-left text-xs text-emerald-900 space-y-2.5 font-bold">
                <p className="text-sm font-black border-b border-emerald-100 pb-1.5 text-brand-blue">
                  অর্ডার আইডি: {placedOrderDetails?.orderId}
                </p>
                <p>👤 কাস্টমার: {placedOrderDetails?.name}</p>
                <p>📞 মোবাইল: {placedOrderDetails?.phone}</p>
                <p>📍 ডেলিভারি ঠিকানা: {placedOrderDetails?.address}</p>
                <div className="pt-2 border-t border-emerald-100/50">
                  <p className="font-extrabold mb-1">অর্ডারকৃত পণ্যসমূহ:</p>
                  {placedOrderDetails?.items.map((item: any, i: number) => (
                    <p key={i} className="text-gray-600 font-semibold pl-2">
                      • {item.name} ({item.brand}) - {item.quantity} টি × ৳{item.price}
                    </p>
                  ))}
                </div>
                <p className="text-sm font-black text-brand-blue pt-2 border-t border-emerald-100/50">
                  সর্বমোট পরিশোধযোগ্য বিল: ৳{placedOrderDetails?.total} (ক্যাশ অন ডেলিভারি)
                </p>
              </div>

              <button
                onClick={() => { setOrderPlaced(false); setPlacedOrderDetails(null); closeCart(); }}
                className="w-full py-3 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-extrabold text-sm shadow-md transition-colors"
              >
                কেনাকাটা চালিয়ে যান
              </button>
            </div>

          ) : cartItems.length === 0 ? (
            /* ── Empty Cart ── */
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-800">আপনার শপিং ব্যাগ খালি</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">ব্যাগ-এ কোনো পণ্য নেই। পণ্য যোগ করতে এখনই শপ করুন।</p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-xs font-bold transition-all shadow"
              >
                কেনাকাটা করুন
              </button>
            </div>

          ) : (
            /* ── Cart Contents & Checkout Form ── */
            <div className="space-y-5">

              {/* Cart Items */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">পণ্য তালিকা</p>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-150">
                    <div className="relative w-14 h-14 bg-white border border-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image src={item.imageUrl} alt={item.name} width={52} height={52} className="object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black text-brand-blue block uppercase leading-none">{item.brand}</span>
                      <h4 className="text-xs font-black text-gray-800 truncate mt-0.5">{item.name.split(' (')[0]}</h4>
                      <div className="text-xs font-extrabold text-gray-900 mt-0.5">৳{item.price}</div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-black text-gray-700 min-w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-gray-400 hover:text-brand-red transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-b border-gray-100 py-4 space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>পণ্যের দাম (Subtotal):</span>
                  <span className="text-gray-900 font-extrabold">৳{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-600 items-center">
                  <span className="flex items-center gap-1">
                    <Truck size={13} className="text-brand-blue" />
                    ডেলিভারি চার্জ:
                  </span>
                  <span className="text-gray-900 font-extrabold">
                    {isFreeDelivery ? (
                      <span className="text-emerald-600 font-black">ফ্রি (৳০)</span>
                    ) : (
                      `৳${deliveryCharge}`
                    )}
                  </span>
                </div>
                {checkoutData.area === 'dhaka' && cartTotal < 1500 && (
                  <p className="text-[10px] text-brand-blue font-bold text-right">
                    * আর ৳{1500 - cartTotal} টাকার কেনাকাটা করলে ডেলিভারি চার্জ ফ্রি!
                  </p>
                )}
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span className="text-brand-blue">সর্বমোট বিল (Total):</span>
                  <span className="text-brand-blue">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">ডেলিভারি ও কাস্টমার তথ্য</p>
                <form onSubmit={handleSubmitOrder} className="space-y-3">

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-extrabold text-gray-600">আপনার নাম (Full Name)*</label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="যেমন: মোঃ সাকিব হোসেন"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-extrabold text-gray-600">মোবাইল নাম্বার (Mobile Number)*</label>
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      placeholder="যেমন: 017XXXXXXXX"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-extrabold text-gray-600">পূর্ণ ডেলিভারি ঠিকানা (Full Address)*</label>
                    <textarea
                      required
                      rows={3}
                      disabled={isSubmitting}
                      placeholder="বাসা নাম্বার, রোড নাম্বার, এলাকা, থানা ও জেলা..."
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Delivery Area */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-extrabold text-gray-600">ডেলিভারি এলাকা (Delivery Area)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all text-sm font-bold ${
                        checkoutData.area === 'dhaka'
                          ? 'border-brand-blue bg-pink-50/50 text-brand-blue'
                          : 'border-gray-200 bg-white text-gray-500'
                      }`}>
                        <input
                          type="radio"
                          name="drawerArea"
                          value="dhaka"
                          disabled={isSubmitting}
                          checked={checkoutData.area === 'dhaka'}
                          onChange={() => setCheckoutData({ ...checkoutData, area: 'dhaka' })}
                          className="sr-only"
                        />
                        ঢাকা সিটি
                      </label>
                      <label className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all text-sm font-bold ${
                        checkoutData.area === 'outside'
                          ? 'border-brand-blue bg-pink-50/50 text-brand-blue'
                          : 'border-gray-200 bg-white text-gray-500'
                      }`}>
                        <input
                          type="radio"
                          name="drawerArea"
                          value="outside"
                          disabled={isSubmitting}
                          checked={checkoutData.area === 'outside'}
                          onChange={() => setCheckoutData({ ...checkoutData, area: 'outside' })}
                          className="sr-only"
                        />
                        ঢাকার বাইরে
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-1 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>অর্ডার প্রসেস হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <PhoneCall size={15} />
                        <span>অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
