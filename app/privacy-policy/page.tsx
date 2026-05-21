import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | ersbeauty Bangladesh",
  description: "Privacy Policy and customer data protection details for ersbeauty Bangladesh.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-white max-w-4xl w-full mx-auto px-4 py-10 md:py-16">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="border-b border-gray-150 pb-6">
            <div className="flex items-center gap-3 text-brand-blue mb-3">
              <ShieldCheck size={28} />
              <span className="text-xs font-black uppercase tracking-widest bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
                Security & Trust
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Privacy Policy (গোপনীয়তা নীতি)
            </h1>
            <p className="text-xs font-semibold text-gray-400 mt-2">সর্বশেষ আপডেট: মে ২০২১, ২০২৬</p>
          </div>

          {/* Bengali Content Description */}
          <div className="prose max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-6 font-medium">
            <p>
              <strong>ersbeauty</strong>-এ আপনার গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান দায়িত্ব। আমাদের ওয়েবসাইট ব্যবহারের সময় আপনার কোন কোন তথ্য সংগ্রহ করা হয় এবং তা কীভাবে সুরক্ষিত রাখা হয়, তা এই নীতিমালায় বিস্তারিত আলোচনা করা হলো।
            </p>

            {/* Point 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <FileText size={18} className="text-brand-blue" />
                ১. সংগৃহীত তথ্যসমূহ (Information We Collect)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-1">
                আমরা মূলত কাস্টমারের অর্ডার সফলভাবে সম্পন্ন ও ডেলিভারি করার জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি। এর মধ্যে রয়েছে:
              </p>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1.5 pl-3">
                <li>আপনার নাম (Full Name)</li>
                <li>মোবাইল নাম্বার (Mobile Number)</li>
                <li>পূর্ণ ডেলিভারি ঠিকানা (Shipping Address)</li>
                <li>অর্ডারকৃত পণ্যের বিবরণ</li>
              </ul>
            </div>

            {/* Point 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <Lock size={18} className="text-brand-blue" />
                ২. তথ্যের ব্যবহার ও নিরাপত্তা (How We Use Your Data)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-1">
                আপনার প্রদত্ত তথ্য আমরা অত্যন্ত সতর্কতার সাথে সুরক্ষিত রাখি। এই তথ্যগুলো শুধুমাত্র নিচের কাজে ব্যবহৃত হয়:
              </p>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1.5 pl-3">
                <li>আপনার অর্ডারটি ক্যাশ অন ডেলিভারি (Cash on Delivery) মাধ্যমে আপনার ঠিকানায় সঠিক সময়ে পৌঁছে দেওয়া।</li>
                <li>অর্ডার নিশ্চিত করার জন্য আমাদের প্রতিনিধি দ্বারা আপনার সাথে ফোনে যোগাযোগ করা।</li>
                <li>যেকোনো প্রয়োজনে জরুরি সহায়তা বা কাস্টমার কেয়ার সাপোর্ট প্রদান করা।</li>
              </ul>
              <p className="text-xs md:text-sm text-amber-700 bg-amber-50 border border-amber-100/50 p-3 rounded-lg font-bold">
                ⚠️ আমরা কোনো থার্ড-পার্টি বা বাইরের কোনো সংস্থার কাছে আপনার ফোন নাম্বার, নাম বা ঠিকানা বিক্রি বা শেয়ার করি না।
              </p>
            </div>

            {/* Point 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                <Eye size={18} className="text-brand-blue" />
                ৩. কুকিজ নীতিমালা (Cookies Policy)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-1">
                আমাদের ওয়েবসাইটে ব্রাউজিং অভিজ্ঞতা সহজ করার জন্য এবং আপনার শপিং ব্যাগ (Cart Details) সংরক্ষণ করার জন্য ব্রাউজারের লোকাল স্টোরেজ (Local Storage) এবং কুকিজ ব্যবহার করা হতে পারে। এগুলো আপনার ডিভাইসের নিরাপত্তা বিঘ্নিত করে না।
              </p>
            </div>

            {/* Point 4 */}
            <div className="space-y-3 pt-4">
              <h3 className="font-black text-gray-900 text-xl">৪. যোগাযোগ (Contact Us)</h3>
              <p className="text-xs md:text-sm text-gray-600">
                আমাদের গোপনীয়তা নীতি নিয়ে যেকোনো প্রশ্ন বা মতামত থাকলে আমাদের সাথে যোগাযোগ করতে পারেন:
              </p>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1 pl-1">
                <li>📞 হটলাইন: <a href="tel:+8801405892234" className="font-bold text-brand-blue hover:underline">+880 1405-892234</a></li>
                <li>📧 ইমেইল: <strong>support@ersbeauty.com</strong></li>
                <li>📍 অফিস ঠিকানা: খিলক্ষেত মধ্যপাড়া আলী মার্কেট, ঢাকা-১২২৯, বাংলাদেশ।</li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
