'use client';
import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function CountDown({ date }: { date: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculate = () => {
      const now = new Date().getTime();
      // tempory set the date as Feb 23 2026
      date = new Date('2026-02-23T00:00:00');
      const difference = date.getTime() - now;

      if (difference <= 0) {
        setIsEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsEnded(false);
        setTimeLeft(calculateTimeLeft(date));
      }
    };

    calculate();
    const timer = setInterval(calculate, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-100 dark:to-neutral-400">
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="text-xl md:text-2xl font-medium text-neutral-500 dark:text-neutral-400">
          {date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {isEnded ? (
        <div className="px-6 py-2 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-xl border border-red-200 dark:border-red-800">
          Event Ended
        </div>
      ) : (
        <div className="grid grid-flow-col gap-6 text-center auto-cols-max">
          <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <span className="countdown font-mono text-4xl md:text-5xl font-bold text-neutral-700 dark:text-neutral-200">
              <span style={{ "--value": timeLeft.days } as React.CSSProperties}>
                {timeLeft.days.toString().padStart(2, '0')}
              </span>
            </span>
            <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider mt-1">days</span>
          </div>
          <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <span className="countdown font-mono text-4xl md:text-5xl font-bold text-neutral-700 dark:text-neutral-200">
              <span style={{ "--value": timeLeft.hours } as React.CSSProperties}>
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
            </span>
            <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider mt-1">hours</span>
          </div>
          <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <span className="countdown font-mono text-4xl md:text-5xl font-bold text-neutral-700 dark:text-neutral-200">
              <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}>
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
            </span>
            <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider mt-1">min</span>
          </div>
          <div className="flex flex-col p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <span className="countdown font-mono text-4xl md:text-5xl font-bold text-neutral-700 dark:text-neutral-200">
              <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}>
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
            </span>
            <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider mt-1">sec</span>
          </div>
        </div>
      )}
    </div>
  );
}
