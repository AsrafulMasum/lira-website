"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Contest } from "./types";
import { SortableContestCard } from "./SortableContestCard";

interface SortableContestGridProps {
  contests: Contest[];
  categoryId: string;
}

export const SortableContestGrid = ({ contests }: SortableContestGridProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Handle contest reordering within category
      console.log(`Moving contest ${active.id} to position of ${over?.id}`);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={contests.map((c) => c._id || c.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests?.map((contest) => (
            <SortableContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
