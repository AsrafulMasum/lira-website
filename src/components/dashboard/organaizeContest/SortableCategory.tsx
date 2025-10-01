"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  GripVertical,
  Trash2,
} from "lucide-react";
import { Category } from "./types";
import { SortableContestGrid } from "./SortableContestGrid";

interface SortableCategoryProps {
  category: Category;
  onToggleExpand: (categoryId: string) => void;
  onEditCategory: (categoryId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  contests?: any[];
  isLoadingContests?: boolean;
}

export const SortableCategory = ({
  category,
  onToggleExpand,
  onEditCategory,
  onDeleteCategory,
  contests = [],
  isLoadingContests = false,
}: SortableCategoryProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  console.log("in count line", contests);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg border border-gray-200 transition-all duration-200 ${
        isDragging ? "shadow-2xl scale-105 rotate-2" : "hover:shadow-md"
      }`}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50 ${
              isDragging ? "text-blue-600 bg-blue-50" : ""
            }`}
            title="Drag to reorder categories"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleExpand(category.id)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50 transition-colors"
            title={
              category.isExpanded ? "Collapse category" : "Expand category"
            }
          >
            {category.isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          <span className="font-medium text-gray-900">{category.name}</span>
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 font-medium"
          >
            {category.count}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEditCategory(category.id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteCategory(category.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contest Cards */}
      {category.isExpanded && (
        <div className="p-4 bg-gray-50/50">
          {isLoadingContests ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : contests && contests.length > 0 ? (
            <SortableContestGrid contests={contests} categoryId={category.id} />
          ) : (
            <div className="text-center py-4 text-gray-500">
              No contests found in this category
            </div>
          )}
        </div>
      )}
    </div>
  );
};
