"use client";

import Countdown from "react-countdown";

export default function ContestCountdown({
  endDate,
  isMarketPlace,
}: {
  endDate: string;
  isMarketPlace: boolean;
}) {
  const renderer = ({
    days,
    hours,
    minutes,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    completed: boolean;
  }) => {
    if (completed && isMarketPlace) {
      return <span>Contest Ended</span>;
    } else if (isMarketPlace) {
      return (
        <span>
          Ends In {days}d {hours}h {minutes}m
        </span>
      );
    } else {
      return (
        <div className="flex items-center gap-6 text-primary">
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold">{days}</p>
            <p className="text-xs font-semibold">Days</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold">{hours}</p>
            <p className="text-xs font-semibold">Hours</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold">{minutes}</p>
            <p className="text-xs font-semibold">Minutes</p>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={new Date(endDate)} renderer={renderer} />;
}
