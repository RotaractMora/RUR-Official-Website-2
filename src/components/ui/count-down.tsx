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

  // Only run on the client
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-4xl animate-flip">
          <span style={{ "--value": timeLeft.days } as React.CSSProperties}>
            {timeLeft.days.toString().padStart(2, '0')}
          </span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-4xl animate-flip">
          <span style={{ "--value": timeLeft.hours } as React.CSSProperties}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-4xl animate-flip">
          <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-4xl animate-flip">
          <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
        </span>
        sec
      </div>
    </div>
  );
}
