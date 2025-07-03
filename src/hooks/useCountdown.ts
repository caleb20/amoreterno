import { useState, useEffect } from 'react';

export const useCountdown = (targetHour = 17, targetMinute = 0) => {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoffTime = new Date();
      cutoffTime.setHours(targetHour, targetMinute, 0, 0); // Set target time
      
      // If current time is past target time, set target for tomorrow
      if (now > cutoffTime) {
        cutoffTime.setDate(cutoffTime.getDate() + 1);
      }
      
      const timeDiff = cutoffTime.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setCountdown({ hours, minutes, seconds });
      } else {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetHour, targetMinute]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return {
    countdown,
    formatTime,
    isExpired: countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0
  };
};