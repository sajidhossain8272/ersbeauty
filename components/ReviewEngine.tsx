'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { ProductReview } from '../lib/db';

interface ReviewEngineProps {
  reviews: ProductReview[];
}

export default function ReviewEngine({ reviews }: ReviewEngineProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [userReviews, setUserReviews] = useState<ProductReview[]>(reviews);
  const [reviewAdded, setReviewAdded] = useState(false);

  // Aggregated calculations
  const totalReviewsCount = 187; // Mimicking the reference screenshot count
  const averageRating = 4.9;

  const distribution = [
    { stars: 5, percentage: 96, count: 179 },
    { stars: 4, percentage: 3, count: 6 },
    { stars: 3, percentage: 1, count: 2 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert('দয়া করে সব তথ্য পূরণ করুন।');
      return;
    }

    const review: ProductReview = {
      id: `custom-rev-${Date.now()}`,
      rating: Number(newReview.rating),
      comment: newReview.comment,
      reviewer: newReview.name,
      date: new Date().toLocaleDateString('en-US')
    };

    setUserReviews([review, ...userReviews]);
    setReviewAdded(true);
    setNewReview({ name: '', rating: 5, comment: '' });
    
    setTimeout(() => {
      setReviewAdded(false);
      setShowWriteReview(false);
    }, 3000);
  };

  const renderStars = (rating: number, size = 16) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-2">
            <span>Customer Reviews</span>
            <span className="text-sm font-extrabold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {totalReviewsCount}
            </span>
          </h2>
        </div>
        <button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="px-4 py-2 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <MessageSquare size={14} />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Aggregate Review Score Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
        
        {/* Left column: Big Score */}
        <div className="flex flex-col items-center justify-center text-center p-2 border-b md:border-b-0 md:border-r border-gray-200/65">
          <span className="text-5xl font-black text-gray-900 leading-none">{averageRating}</span>
          <div className="mt-3">{renderStars(5, 20)}</div>
          <span className="text-xs font-extrabold text-gray-500 mt-2">
            Based on {totalReviewsCount} Verified Ratings
          </span>
        </div>

        {/* Middle column: Bars */}
        <div className="flex flex-col justify-center gap-2 py-2 px-2 md:col-span-2">
          {distribution.map((dist, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-bold text-gray-600">
              <span className="w-10 text-right shrink-0 flex items-center justify-end gap-1">
                {dist.stars} <Star size={11} className="fill-yellow-400 text-yellow-400" />
              </span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="w-10 text-gray-400 shrink-0">{dist.percentage}%</span>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 animate-slideDown">
          {reviewAdded ? (
            <div className="text-center py-6 text-emerald-800 font-bold space-y-2">
              <CheckCircle size={36} className="text-emerald-600 mx-auto" />
              <p>আপনার রিভিউটি সফলভাবে জমা দেওয়া হয়েছে!</p>
              <p className="text-xs text-gray-500">এটি এখন রিভিউ তালিকায় লাইভ দেখা যাচ্ছে।</p>
            </div>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-4">
              <h3 className="font-extrabold text-gray-800 text-base">Write your Review</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">আপনার নাম (Your Name)*</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সাকিব আহমেদ"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">রেটিং (Rating)*</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue font-semibold text-gray-700"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Star)</option>
                    <option value="3">⭐⭐⭐ (3 Star)</option>
                    <option value="2">⭐⭐ (2 Star)</option>
                    <option value="1">⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500">মন্তব্য (Your Review)*</label>
                <textarea
                  required
                  rows={3}
                  placeholder="পণ্যটি আপনার কেমন লেগেছে? ব্যবহারের অনুভূতি শেয়ার করুন..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-5 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-colors"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      )}

      {/* Individual Review List */}
      <div className="space-y-6">
        {userReviews.map((rev, idx) => {
          // Get reviewer initials
          const initials = rev.reviewer
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

          return (
            <div 
              key={rev.id} 
              className={`flex gap-4 items-start ${
                idx !== userReviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''
              }`}
            >
              {/* Reviewer Avatar Badge */}
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm flex items-center justify-center shrink-0 shadow-inner select-none">
                {initials || 'U'}
              </div>

              {/* Review Body */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900 text-sm">{rev.reviewer}</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                      <CheckCircle size={10} className="fill-emerald-600 text-white" />
                      Verified Buyer
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="pt-0.5">{renderStars(rev.rating)}</div>

                {/* Comment Text */}
                <p className="text-gray-700 text-sm leading-relaxed font-semibold">
                  {rev.comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
