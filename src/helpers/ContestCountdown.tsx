"use client";

import Countdown from "react-countdown";

export default function ContestCountdown({ endDate }: { endDate: string }) {
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
    if (completed) {
      return <span>Contest Ended</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m
        </span>
      );
    }
  };

  return <Countdown date={new Date(endDate)} renderer={renderer} />;
}
