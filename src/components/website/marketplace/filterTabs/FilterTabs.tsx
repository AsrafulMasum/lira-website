"use client";

import { useState } from "react";

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState<"today" | "add">("today");

  return (
    <div className="w-full overflow-auto rounded-xl p-0 relative">
      {/* Custom Tabs */}
      <div>
        <div className="flex items-center rounded-lg py-[6px]  px-[14px]">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 text-sm  px-3 py-2 rounded-[8px] transition ${
              activeTab === "today"
                ? "bg-white  text-[#003877] font-medium"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 text-sm font-medium px-3 py-2 rounded-md transition ${
              activeTab === "add"
                ? "bg-white  text-[#003877] font-medium"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
             Add Event
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "today" && <div className="p-4">Today's Events Content</div>}
      {activeTab === "add" && <div className="p-4">Add Event Content</div>}
    </div>
  );
}
