"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableTabProps {
  tab: string;
  isActive: boolean;
  onClick: () => void;
}

export const SortableTab = ({ 
  tab, 
  isActive, 
  onClick 
}: SortableTabProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1 ${isDragging ? 'z-10' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
        title="Drag to reorder tab"
      >
        <GripVertical className="w-3 h-3 text-gray-300 hover:text-gray-500" />
      </div>
      <button
        onClick={onClick}
        className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
          isActive
            ? "border-green-600 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        {tab}
      </button>
    </div>
  );
};