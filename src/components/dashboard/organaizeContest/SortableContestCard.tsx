"use client";

import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Contest } from "./types";

interface SortableContestCardProps {
  contest: Contest;
}

export const SortableContestCard = ({ contest }: SortableContestCardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: contest._id || contest.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  // Only render the full component on the client side
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="p-1">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
        <h3 className="font-medium text-gray-900 mb-2">{contest.name}</h3>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-200 ${
        isDragging
          ? "shadow-2xl scale-110 rotate-1 border-blue-300"
          : "hover:border-gray-300 hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <button
          {...attributes}
          {...listeners}
          className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50 ${
            isDragging ? "text-blue-600 bg-blue-50" : ""
          }`}
          title="Drag to reorder contests"
          suppressHydrationWarning
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Visual indicator for draggable item */}
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            isDragging ? "bg-blue-500" : "bg-gray-300"
          }`}
        />
      </div>

      <h3 className="font-medium text-gray-900 mb-2">{contest.name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        Status: {contest.status || "N/A"}
      </p>
      <p className="text-xs text-gray-500">
        {new Date(contest.endTime || contest.date).toLocaleDateString()}
      </p>

      {/* Drag indicator line */}
      <div
        className={`mt-3 h-0.5 rounded-full transition-all duration-200 ${
          isDragging
            ? "bg-blue-500 w-full"
            : "bg-gray-200 w-0 group-hover:w-full"
        }`}
      />
    </div>
  );
};
