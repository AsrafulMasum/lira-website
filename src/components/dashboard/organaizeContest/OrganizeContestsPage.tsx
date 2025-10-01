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
import { SortableGroupItem } from "./SortableGroupItem";
import { Category } from "./types";
import {
  useCreateCategoryMutation,
  useGetAllGroupQuery,
  useGetCategoriesByGroupIdQuery,
} from "@/redux/apiSlices/categoryUnitTypeSlice";
import { useGetContestByCategoryIdQuery } from "@/redux/apiSlices/contestSlice";

const OrganizeContestsPage = () => {
  // Get all groups data first
  const { data: getAllGroups, isLoading: isLoadingGroups } =
    useGetAllGroupQuery(undefined);

  // Initialize state with empty values
  const [activeGroup, setActiveGroup] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [groups, setGroups] = useState([
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
  const [originalGroupName, setOriginalGroupName] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [dataSource, setDataSource] = useState("");

  // Set the active group to the first group ID when groups data is loaded
  React.useEffect(() => {
    if (getAllGroups?.data && getAllGroups.data.length > 0) {
      setActiveGroup(getAllGroups.data[0]._id);
      setSelectedGroup(getAllGroups.data[0]._id);
    }
  }, [getAllGroups]);

  // Fetch categories based on the active group ID
  const { data: getCategoriesByGroupId, isLoading: isLoadingCategories } =
    useGetCategoriesByGroupIdQuery(
      activeGroup,
      { skip: !activeGroup } // Skip the query if activeGroup is empty
    );

  // State to track the active category for contest fetching
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch contests based on the active category ID
  const { data: getContestByCategoryId, isLoading: isLoadingContests } =
    useGetContestByCategoryIdQuery(
      activeCategory,
      { skip: !activeCategory } // Skip the query if activeCategory is empty
    );

  // Get categories for the active group
  const categoriesForActiveGroup = React.useMemo(() => {
    if (isLoadingCategories) {
      return [];
    }
    return getCategoriesByGroupId?.data || [];
  }, [getCategoriesByGroupId, isLoadingCategories]);

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

  const [createCategory, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation();

  if (isLoadingGroups) {
    return <div>Loading groups...</div>;
  }

  const allGroups = getAllGroups?.data || [];

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
    // Find the category to check its current expanded state
    const category = categoriesForActiveGroup.find(
      (cat: any) => cat._id === categoryId
    );
    const isCurrentlyExpanded = category?.isExpanded || false;

    // If we're expanding the category, set it as active to fetch contests
    // If we're collapsing it, clear the active category
    if (!isCurrentlyExpanded) {
      setActiveCategory(categoryId);
    } else {
      setActiveCategory("");
    }

    // Toggle the expanded state in the UI
    const updatedCategories = categoriesForActiveGroup.map((cat: any) => {
      if (cat._id === categoryId) {
        return { ...cat, isExpanded: !isCurrentlyExpanded };
      }
      // Collapse other categories when expanding this one
      return cat._id !== categoryId && !isCurrentlyExpanded
        ? { ...cat, isExpanded: false }
        : cat;
    });
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
      // Update active group if it was the edited category
      if (selectedCategory.name === activeGroup) {
        setActiveGroup(groupName);
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
    setOriginalGroupName("");
    setCategoryTitle("");
    setSelectedGroup("Crypto Market");
    setDataSource("");
  };

  // const handleDeleteGroup = (categoryId: string) => {
  //   setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  // };

  // Handle drag end for groups in Edit Groups Sheet
  const handleGroupDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setGroups((items) => {
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
          New category.
        </Button>
      </div>

      {/* Groups */}
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

        {allGroups?.map((group: any) => (
          <button
            key={group?._id}
            onClick={() => setActiveGroup(group?._id)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeGroup === group?._id
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {group?.name}
          </button>
        ))}
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {isLoadingCategories ? (
          <div>Loading categories...</div>
        ) : categoriesForActiveGroup.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categoriesForActiveGroup?.map((c: any) => c._id)}
              strategy={verticalListSortingStrategy}
            >
              {categoriesForActiveGroup?.map((category: any) => (
                <SortableCategory
                  key={category._id}
                  category={{
                    id: category._id,
                    name: category.name,
                    count: category.count || 0,
                    isExpanded: category._id === activeCategory,
                    contests: category.contests || [],
                  }}
                  contests={
                    category._id === activeCategory
                      ? getContestByCategoryId?.data || []
                      : []
                  }
                  isLoadingContests={
                    category._id === activeCategory && isLoadingContests
                  }
                  onToggleExpand={handleToggleExpand}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div>No categories found for this group</div>
        )}
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
              <h3 className="text-sm font-medium">Groups</h3>
              <div className="space-y-2">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleGroupDragEnd}
                >
                  <SortableContext
                    items={allGroups?.map((group: any) => group._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {allGroups?.map((group: any) => (
                      <SortableGroupItem
                        key={group._id}
                        tab={group.name}
                        groupId={group._id}
                        onEdit={(groupName) => {
                          // Find the group by name to get its ID
                          const groupObj = allGroups.find(
                            (g: any) => g.name === groupName
                          );
                          if (groupObj) {
                            setOriginalGroupName(groupObj.name);
                            setGroupName(groupObj.name);
                            setIsAddGroupModalOpen(true);
                          }
                        }}
                        onDelete={(groupName) => {
                          // Handle delete group - would need API integration
                          console.log(`Delete group: ${groupName}`);
                        }}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              <Button
                onClick={() => {
                  setOriginalGroupName("");
                  setGroupName("");
                  setIsAddGroupModalOpen(true);
                }}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Group
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
                Name
              </label>
              <Input
                id="title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter category name"
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
                  {allGroups?.map((group: any) => (
                    <SelectItem key={group._id} value={group._id}>
                      {group.name}
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
                URL
              </label>
              <Input
                id="dataSource"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="col-span-3"
                placeholder="Enter data source URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (categoryTitle.trim() && selectedGroup) {
                  // Create category with API
                  createCategory({
                    name: categoryTitle,
                    groupId: selectedGroup,
                    url: dataSource,
                  });
                  handleCloseModal();
                }
              }}
              disabled={
                isLoadingCreateCategory ||
                !categoryTitle.trim() ||
                !selectedGroup
              }
            >
              {isLoadingCreateCategory ? "Creating..." : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Modal */}
      <Dialog open={isAddGroupModalOpen} onOpenChange={setIsAddGroupModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {groups.includes(groupName) ? "Edit Group" : "Add New Group"}
            </DialogTitle>
            <DialogDescription>
              {groups.includes(groupName)
                ? "Edit your existing group name."
                : "Create a new group to organize your categories."}
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
            <Button
              onClick={() => {
                if (groupName.trim()) {
                  if (originalGroupName) {
                    // This is an edit operation - we need to update the existing group
                    setGroups((prev) => {
                      const newGroups = [...prev];
                      const index = newGroups.indexOf(originalGroupName);
                      if (index !== -1) {
                        newGroups[index] = groupName;
                      }
                      return newGroups;
                    });
                  } else {
                    // This is an add operation
                    setGroups((prev) => [...prev, groupName]);
                  }
                  handleCloseModal();
                }
              }}
            >
              {originalGroupName ? "Save Changes" : "Add Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizeContestsPage;
