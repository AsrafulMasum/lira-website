"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// TypeScript interfaces
interface Contest {
  id: string;
  name: string;
  price: string;
  date: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  isExpanded: boolean;
  contests: Contest[];
}

// Sortable Group Item Component
const SortableGroupItem = ({ 
  category, 
  onEdit, 
  onDelete 
}: { 
  category: Category; 
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

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
          {category.name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Edit group"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={() => onDelete(category.id)}
          className="p-2 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
          title="Delete group"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

// Sortable Tab Item Component for Edit Groups Sheet
const SortableTabItem = ({ 
  tab, 
  onEdit, 
  onDelete 
}: { 
  tab: string; 
  onEdit: (tab: string) => void;
  onDelete: (tab: string) => void;
}) => {
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
          title="Edit tab"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={() => onDelete(tab)}
          className="p-2 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
          title="Delete tab"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};
const SortableTab = ({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: string; 
  isActive: boolean;
  onClick: () => void;
}) => {
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

// Sample contest data organized by categories
const initialCategories: Category[] = [
  {
    id: "crypto-market",
    name: "Crypto Market",
    count: 8,
    isExpanded: true,
    contests: [
      {
        id: "contest-1",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-2",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-3",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "weather",
    name: "Weather",
    count: 3,
    isExpanded: false,
    contests: [
      {
        id: "contest-4",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-5",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "stock-market",
    name: "Stock Market",
    count: 2,
    isExpanded: false,
    contests: [
      {
        id: "contest-6",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "category-4",
    name: "Category name",
    count: 5,
    isExpanded: false,
    contests: [
      {
        id: "contest-7",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-8",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "category-5",
    name: "Category name",
    count: 0,
    isExpanded: false,
    contests: [],
  },
];

// Sortable Category Component
interface SortableCategoryProps {
  category: Category;
  onToggleExpand: (categoryId: string) => void;
  onEditCategory: (categoryId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const SortableCategory = ({
  category,
  onToggleExpand,
  onEditCategory,
  onDeleteCategory,
}: SortableCategoryProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

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
          <SortableContestGrid
            contests={category.contests}
            categoryId={category.id}
          />
        </div>
      )}
    </div>
  );
};

// Sortable Contest Card Component
interface SortableContestCardProps {
  contest: Contest;
}

const SortableContestCard = ({ contest }: SortableContestCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: contest.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

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
      <p className="text-sm text-gray-600 mb-1">{contest.price}</p>
      <p className="text-xs text-gray-500">{contest.date}</p>

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

// Sortable Contest Grid Component
interface SortableContestGridProps {
  contests: Contest[];
  categoryId: string;
}

const SortableContestGrid = ({ contests }: SortableContestGridProps) => {
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
        items={contests.map((c) => c.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map((contest) => (
            <SortableContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

const OrganizeContestsPage = () => {
  const [activeTab, setActiveTab] = useState("Crypto Market");
  const [categories, setCategories] = useState(initialCategories);
  const [tabs, setTabs] = useState(["Crypto Market", "Weather", "Stock Market"]);

  // Modal state management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditGroupsSheetOpen, setIsEditGroupsSheetOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [groupName, setGroupName] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Crypto Market");
  const [dataSource, setDataSource] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggleExpand = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
      )
    );
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setGroupName(category.name);
      setIsCreateModalOpen(true);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  // Modal handlers
  const handleCreateGroup = () => {
    setGroupName("");
    setIsCreateModalOpen(true);
  };

  const handleEditGroup = () => {
    // Show edit groups sheet
    setIsEditGroupsSheetOpen(true);
  };

  const handleSaveGroup = () => {
    if (!groupName.trim()) return;

    if (selectedCategory) {
      // Edit existing group
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, name: groupName } : cat
        )
      );
      // Update active tab if it was the edited category
      if (selectedCategory.name === activeTab) {
        setActiveTab(groupName);
      }
    } else {
      // Create new group
      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name: groupName,
        count: 0,
        isExpanded: false,
        contests: [],
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    // Close modals and reset state
    setIsCreateModalOpen(false);
    setSelectedCategory(null);
    setGroupName("");
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setIsEditGroupsSheetOpen(false);
    setIsAddCategoryModalOpen(false);
    setIsAddGroupModalOpen(false);
    setSelectedCategory(null);
    setGroupName("");
    setCategoryTitle("");
    setSelectedGroup("Crypto Market");
    setDataSource("");
  };

  const handleDeleteGroup = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  // Handle drag end for tabs in Edit Groups Sheet
  const handleTabDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTabs((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Organize contests
          </h2>
        </div>
        <Button
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New category
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-8 border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateGroup}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Create new group"
          >
            <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
          <button
            onClick={handleEditGroup}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Edit current group"
          >
            <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {categories.map((category) => (
              <SortableCategory
                key={category.id}
                category={category}
                onToggleExpand={handleToggleExpand}
                onEditCategory={handleEditCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Create Group Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Edit Group" : "Create New Group"}
            </DialogTitle>
            <DialogDescription>
              {selectedCategory
                ? "Update the name of your contest group."
                : "Enter a name for your new contest group."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="group-name" className="text-right">
                Name
              </label>
              <Input
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="col-span-3"
                placeholder="Enter group name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveGroup();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroup} disabled={!groupName.trim()}>
              {selectedCategory ? "Update Group" : "Create Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Groups Sheet */}
      <Sheet
        open={isEditGroupsSheetOpen}
        onOpenChange={setIsEditGroupsSheetOpen}
      >
        <SheetContent className="w-full sm:max-w-md rounded-l-3xl">
          <SheetHeader>
            <SheetTitle>Edit groups</SheetTitle>
          </SheetHeader>

          <div className="flex-1 space-y-3 p-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleTabDragEnd}
            >
              <SortableContext
                items={tabs}
                strategy={verticalListSortingStrategy}
              >
                {tabs.map((tab) => (
                  <SortableTabItem
                    key={tab}
                    tab={tab}
                    onEdit={(tab) => {
                      // Handle edit tab logic here
                      console.log("Edit tab:", tab);
                    }}
                    onDelete={(tab) => {
                      // Handle delete tab logic here
                      setTabs(prev => prev.filter(t => t !== tab));
                      if (activeTab === tab && tabs.length > 1) {
                        setActiveTab(tabs.find(t => t !== tab) || tabs[0]);
                      }
                    }}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <SheetFooter className="flex flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditGroupsSheetOpen(false)}
              className="flex-1 cursor-pointer"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsEditGroupsSheetOpen(false);
                setIsAddGroupModalOpen(true);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700  cursor-pointer"
            >
              Add
            </Button>
            <Button
              onClick={() => setIsEditGroupsSheetOpen(false)}
              className="flex-1 cursor-pointer"
            >
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add Category Modal */}
      <Dialog
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Add category
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="Category name"
                className="w-full mt-2"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Group</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-full py-6 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Crypto Market">Crypto Market</SelectItem>
                  <SelectItem value="Weather">Weather</SelectItem>
                  <SelectItem value="Stock Market">Stock Market</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Data Source (for price feed/graph)
              </label>
              <Input
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                placeholder="URL"
                className="w-full mt-2"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle add category logic here
                console.log("Adding category:", {
                  categoryTitle,
                  selectedGroup,
                  dataSource,
                });
                handleCloseModal();
              }}
              disabled={!categoryTitle.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Modal */}
      <Dialog open={isAddGroupModalOpen} onOpenChange={setIsAddGroupModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Add a group for categories
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSaveGroup();
                handleCloseModal();
              }}
              disabled={!groupName.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizeContestsPage;
