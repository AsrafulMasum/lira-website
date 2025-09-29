"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Edit } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Import separated components
import { SortableCategory } from "./SortableCategory";
import { SortableTabItem } from "./SortableTabItem";
import { initialCategories } from "./data";
import { Category } from "./types";

const OrganizeContestsPage = () => {
  const [activeTab, setActiveTab] = useState("Crypto Market");
  const [categories, setCategories] = useState(initialCategories);
  const [tabs, setTabs] = useState([
    "Crypto Market",
    "Weather",
    "Stock Market",
  ]);

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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
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
    // Trigger the sheet using the hidden button
    document.getElementById("edit-groups-trigger")?.click();
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

  // const handleDeleteGroup = (categoryId: string) => {
  //   setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  // };

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
                : "Create a new group to organize your contests."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="col-span-3"
                placeholder="Enter group name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroup}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Groups Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="hidden" id="edit-groups-trigger"></button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md rounded-s-3xl px-5">
          <SheetHeader>
            <SheetTitle>Edit Groups</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Tabs</h3>
              <div className="space-y-2">
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
                          // Handle edit tab
                          console.log(`Edit tab: ${tab}`);
                        }}
                        onDelete={(tab) => {
                          // Handle delete tab
                          setTabs((prev) => prev.filter((t) => t !== tab));
                        }}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              <Button
                onClick={() => setIsAddGroupModalOpen(true)}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tab
              </Button>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleCloseModal}>Done</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add Category Modal */}
      <Dialog
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your contests.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter category title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="group" className="text-right text-sm font-medium">
                Group
              </label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {tabs.map((tab) => (
                    <SelectItem key={tab} value={tab}>
                      {tab}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="dataSource"
                className="text-right text-sm font-medium"
              >
                Data Source
              </label>
              <Input
                id="dataSource"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="col-span-3"
                placeholder="Enter data source"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleCloseModal}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Modal */}
      <Dialog open={isAddGroupModalOpen} onOpenChange={setIsAddGroupModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Tab</DialogTitle>
            <DialogDescription>
              Create a new tab to organize your categories.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="col-span-3"
                placeholder="Enter tab name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (groupName.trim()) {
                  setTabs((prev) => [...prev, groupName]);
                  handleCloseModal();
                }
              }}
            >
              Add Tab
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizeContestsPage;
