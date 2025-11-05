"use client";

import Link from "next/link";
import React, { useRef, useEffect } from "react";

// ✅ Custom hook for drag-to-scroll
const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // scroll sensitivity
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return ref;
};

type Tab = {
  _id: string;
  name: string;
};

const CategoryTabs = ({
  tabs,
  activeTab,
}: {
  tabs: Tab[];
  activeTab: string;
}) => {
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide cursor-grab select-none"
    >
      <Link
        href={`?tab=All`}
        className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap flex items-center
          ${
            activeTab === "All"
              ? "text-primary border-primary"
              : "text-neutral-500"
          }`}
      >
        All
      </Link>
      {tabs?.map((tab) => (
        <Link
          key={tab._id}
          href={`?tab=${tab._id}`}
          className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap flex items-center
            ${
              activeTab === tab._id
                ? "text-primary border-primary"
                : "text-neutral-500"
            }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;
