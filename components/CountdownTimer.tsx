'use client';

import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface CountdownTimerProps {
  endTime: string;
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Parse target date. If target is in the past or invalid, use a target 3 days from now for demo stability.
    let targetDate = new Date(endTime).getTime();
    const now = new Date().getTime();
    
    if (isNaN(targetDate) || targetDate <= now) {
      // 3 days from now
      targetDate = now + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000;
    }

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const difference = targetDate - currentTime;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [endTime]);

  if (!isMounted) {
    // SSR Placeholder to prevent layout shift
    return (
      <div className="w-full bg-gradient-to-r from-brand-red to-orange-500 py-3 px-4 rounded-xl flex items-center justify-between text-white animate-pulse">
        <div className="flex items-center gap-2">
          <Flame size={20} className="fill-white" />
          <span className="font-extrabold text-sm uppercase tracking-wider">Flash Sale Ends In:</span>
        </div>
        <div className="font-mono font-bold text-lg">Loading timer...</div>
      </div>
    );
  }

  // Format numbers to double digits
  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full bg-gradient-to-r from-brand-red via-orange-500 to-brand-red bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] py-3.5 px-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-md shadow-brand-red/10 border border-brand-red/20">
      <div className="flex items-center gap-2.5">
        <Flame size={22} className="fill-white animate-bounce" />
        <div className="text-center sm:text-left">
          <span className="font-black text-sm uppercase tracking-widest block leading-none">Flash Sale!</span>
          <span className="text-[11px] font-medium text-white/95">Limited stock available at this discount</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-3 py-1.5 rounded-lg font-mono font-black text-lg sm:text-xl min-w-[44px] text-center border border-white/10 shadow-inner">
            {formatNum(timeLeft.days)}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold mt-1 text-white/80">Days</span>
        </div>
        
        <span className="font-mono font-black text-xl text-white/70 -mt-5">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-3 py-1.5 rounded-lg font-mono font-black text-lg sm:text-xl min-w-[44px] text-center border border-white/10 shadow-inner">
            {formatNum(timeLeft.hours)}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold mt-1 text-white/80">Hrs</span>
        </div>

        <span className="font-mono font-black text-xl text-white/70 -mt-5">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-3 py-1.5 rounded-lg font-mono font-black text-lg sm:text-xl min-w-[44px] text-center border border-white/10 shadow-inner">
            {formatNum(timeLeft.minutes)}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold mt-1 text-white/80">Mins</span>
        </div>

        <span className="font-mono font-black text-xl text-white/70 -mt-5">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-3 py-1.5 rounded-lg font-mono font-black text-lg sm:text-xl min-w-[44px] text-center border border-white/10 shadow-inner text-yellow-300">
            {formatNum(timeLeft.seconds)}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold mt-1 text-white/80">Secs</span>
        </div>
      </div>
    </div>
  );
}
