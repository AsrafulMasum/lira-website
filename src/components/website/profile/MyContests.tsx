import React, { useEffect, useRef, useState } from "react";
import { OngoingContests } from "./OngoingContests";
import PastContests from "./PastContests";

const MyContests = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftRef.current && rightRef.current) {
      rightRef.current.style.height = `${leftRef.current.offsetHeight}px`;
    }
  }, []);

  return (
    <section className="mt-6 flex gap-6 mb-10">
      {/* Left div - natural content height */}
      <div
        className="flex-[2] bg-bg rounded-3xl p-2 h-fit"
        id="leftDiv"
        ref={leftRef}
      >
        <OngoingContests viewAll={false} />
      </div>

      {/* Right div - match left height */}
      <div
        className="flex-[1] bg-bg rounded-3xl p-2 overflow-y-auto scrollbar-hide relative"
        style={{ height: "auto" }}
        id="rightDiv"
        ref={rightRef}
      >
        <PastContests />
      </div>
    </section>
  );
};

export default MyContests;
