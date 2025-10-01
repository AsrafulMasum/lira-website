"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, GripVertical, Trash2 } from "lucide-react";

interface SortableGroupItemProps {
  tab: string;
  groupId: string;
  onEdit: (tab: string) => void;
  onDelete: (tab: string) => void;
}

export const SortableGroupItem = ({ 
  tab, 
  groupId,
  onEdit, 
  onDelete 
}: SortableGroupItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: groupId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-bg rounded-lg ${
        isDragging ? 'shadow-lg z-10' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">
          {tab}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(tab)}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Edit group"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={() => onDelete(tab)}
          className="p-2 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
          title="Delete group"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};