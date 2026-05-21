import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: "Return & Refund Policy | ersbeauty Bangladesh",
  description: "Return and refund guidelines for ersbeauty Bangladesh customers.",
};

export default function ReturnPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-white max-w-4xl w-full mx-auto px-4 py-10 md:py-16">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="border-b border-gray-150 pb-6">
            <div className="flex items-center gap-3 text-brand-blue mb-3">
              <RotateCcw size={28} />
              <span className="text-xs font-black uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                Customer Care & Returns
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Return & Refund Policy (রিটার্ন ও রিফান্ড নীতি)
            </h1>
            <p className="text-xs font-semibold text-gray-400 mt-2">সর্বশেষ আপডেট: মে ২০২১, ২০২৬</p>
          </div>

          {/* Bengali Content Description */}
          <div className="prose max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-6 font-medium">
            <p>
              <strong>ersbeauty</strong>-এ আমরা সবসময় আমাদের কাস্টমারদের সর্বোচ্চ মানের ১০০% খাঁটি প্রোডাক্ট পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। তবে প্রোডাক্ট পাওয়ার পর যদি কোনো ত্রুটি বা সমস্যা লক্ষ্য করেন, তবে আমাদের সহজ রিটার্ন ও রিফান্ড সুবিধা গ্রহণ করতে পারেন।
            </p>

            {/* Point 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <ShieldAlert size={18} className="text-brand-blue" />
                ১. কোন কোন ক্ষেত্রে রিটার্ন গ্রহণযোগ্য? (Eligible Cases for Return)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-1">
                আপনি শুধুমাত্র নিচের ক্ষেত্রে পণ্য আমাদের কাছে ফেরত বা পরিবর্তন করতে পারবেন:
              </p>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1.5 pl-3">
                <li>ডেলিভারির সময় ক্ষতিগ্রস্ত বা ভাঙা অবস্থায় পণ্য পেলে (Damaged/Broken Item)</li>
                <li>ভুল পণ্য বা অন্য কোনো সাইজ/কালার ডেলিভারি করা হলে (Wrong Product Received)</li>
                <li>মেয়াদোত্তীর্ণ বা এক্সপায়ার্ড প্রোডাক্ট হলে (Expired Product)</li>
              </ul>
            </div>

            {/* Point 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <CheckCircle2 size={18} className="text-brand-blue" />
                ২. রিটার্ন করার শর্তসমূহ (Conditions for Return)
              </h3>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1.5 pl-3">
                <li>পণ্যটি সম্পূর্ণ অব্যবহৃত ও ইনট্যাক্ট (Unopened/Unused) থাকতে হবে।</li>
                <li>পণ্যের অরিজিনাল প্যাকেজিং ও সমস্ত স্টিকার বা বারকোড অক্ষত থাকতে হবে।</li>
                <li>পণ্যটি ডেলিভারি পাওয়ার সর্বোচ্চ ২৪ ঘণ্টার মধ্যে আমাদের জানাতে হবে এবং পরবর্তী ৭ দিনের মধ্যে পণ্যটি ফেরত পাঠাতে হবে।</li>
                <li>ডেলিভারি ম্যানের থেকে পাওয়া মেমো বা ইনভয়েসটি সাথে রাখতে হবে।</li>
              </ul>
            </div>

            {/* Point 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <AlertCircle size={18} className="text-brand-blue" />
                ৩. রিফান্ড ও এক্সচেঞ্জ প্রক্রিয়া (Refund & Exchange Process)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-1">
                আমাদের কাছে পণ্যটি ফেরত আসার পর আমাদের কোয়ালিটি কন্ট্রোল টিম প্রোডাক্টটি যাচাই করবে। সব শর্ত ঠিক থাকলে:
              </p>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1.5 pl-3">
                <li><strong>এক্সচেঞ্জ (Exchange):</strong> আমরা সম্পূর্ণ ফ্রিতে আপনার ঠিকানায় নতুন সঠিক প্রোডাক্ট পাঠিয়ে দেব।</li>
                <li><strong>রিফান্ড (Refund):</strong> আপনি চাইলে পণ্য মূল্যের টাকা বিকাশ (bKash), নগদ (Nagad) বা ব্যাংক ট্রান্সফারের মাধ্যমে ৩-৫ কার্যদিবসের মধ্যে রিফান্ড পেয়ে যাবেন।</li>
              </ul>
            </div>

            {/* Point 4 */}
            <div className="space-y-3 pt-4">
              <h3 className="font-black text-gray-900 text-xl">৪. কীভাবে যোগাযোগ করবেন? (How to Contact)</h3>
              <p className="text-xs md:text-sm text-gray-600">
                পণ্য রিটার্ন বা রিফান্ড করতে চাইলে অনুগ্রহ করে নিচে দেওয়া নাম্বারে সরাসরি কল করুন অথবা ইমেইল করুন:
              </p>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1 pl-1">
                <li>📞 কাস্টমার কেয়ার: <a href="tel:+8801405892234" className="font-bold text-brand-blue hover:underline">+880 1405-892234</a></li>
                <li>📧 সাপোর্ট ইমেইল: <strong>support@ersbeauty.com</strong></li>
                <li>💬 ফেসবুক মেসেঞ্জার: <a href="https://m.me/61576467003503" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-bold">m.me/61576467003503</a></li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
