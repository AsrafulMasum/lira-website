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
import { toast } from "sonner";
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
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetAllGroupQuery,
  useGetCategoriesByGroupIdQuery,
  useUpdateGroupMutation,
  useShuffleCategoryMutation,
  useShuffleGroupSerialMutation,
} from "@/redux/apiSlices/categoryUnitTypeSlice";
import { useGetContestByCategoryIdQuery } from "@/redux/apiSlices/contestSlice";

const OrganizeContestsPage = () => {
  // Get all groups data first
  const {
    data: getAllGroups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
    error: groupsError,
  } = useGetAllGroupQuery(undefined);

  // Initialize state
  const [activeGroup, setActiveGroup] = useState("");

  // Modal state management
  const [isEditGroupsSheetOpen, setIsEditGroupsSheetOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [groupName, setGroupName] = useState("");
  const [originalGroupName, setOriginalGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
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
    useGetCategoriesByGroupIdQuery(activeGroup, { skip: !activeGroup });

  // State to track the active category for contest fetching
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch contests based on the active category ID
  const { data: getContestByCategoryId, isLoading: isLoadingContests } =
    useGetContestByCategoryIdQuery(activeCategory, { skip: !activeCategory });

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
  const [updateCategory, { isLoading: isLoadingUpdateCategory }] =
    useUpdateCategoryMutation();
  const [deleteCategoryApi] = useDeleteCategoryMutation();
  const [shuffleCategoryApi] = useShuffleCategoryMutation();

  const [createGroup, { isLoading: isLoadingCreateGroup }] =
    useCreateGroupMutation();
  const [updateGroup, { isLoading: isLoadingUpdateGroup }] =
    useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [shuffleGroupSerial] = useShuffleGroupSerialMutation();

  if (isLoadingGroups) {
    return <div>Loading groups...</div>;
  }

  if (isErrorGroups) {
    const message =
      typeof groupsError === "object" &&
      groupsError !== null &&
      "status" in groupsError
        ? `Failed to load groups (status: ${(groupsError as any).status}).`
        : "Failed to load groups.";
    return <div className="text-red-600">{message}</div>;
  }

  const allGroups = getAllGroups?.data || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Get the current categories array
      const oldCategories = [...categoriesForActiveGroup];

      // Find the indices of the dragged item and the drop target
      const oldIndex = oldCategories.findIndex(
        (cat: any) => cat._id === active.id
      );
      const newIndex = oldCategories.findIndex(
        (cat: any) => cat._id === over?.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        // Create a new array with the updated order
        const newCategories = [...oldCategories];
        const [movedItem] = newCategories.splice(oldIndex, 1);
        newCategories.splice(newIndex, 0, movedItem);

        // Prepare the payload for the API
        const payload = newCategories.map((category: any, index: number) => ({
          _id: category._id,
          serial: index + 1,
        }));

        // Call the API to update the order
        shuffleCategoryApi(payload)
          .unwrap()
          .then((res) => {
            toast.success(res?.message || "Categories reordered successfully");
          })
          .catch((err) => {
            toast.error(err?.data?.message || "Failed to reorder categories");
          });
      }
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
    const apiCategory = categoriesForActiveGroup.find(
      (cat: any) => cat._id === categoryId
    );
    if (apiCategory) {
      const cat = {
        id: apiCategory._id,
        name: apiCategory.name,
        count: apiCategory.count || 0,
        isExpanded: apiCategory._id === activeCategory,
        contests: apiCategory.contests || [],
      } as Category;
      setSelectedCategory(cat);
      setCategoryTitle(cat.name);
      setIsAddCategoryModalOpen(true);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const res = await deleteCategoryApi(categoryId).unwrap();
      toast.success(res?.message || "Category deleted successfully");
    } catch (e: any) {
      toast.error(
        e?.data?.message || "Failed to delete category. Please try again."
      );
    }
  };

  // Modal handlers
  const handleCreateGroup = () => {
    setEditingGroupId(null);
    setOriginalGroupName("");
    setGroupName("");
    setIsAddGroupModalOpen(true);
  };

  const handleEditGroup = () => {
    // Trigger the sheet using the hidden button
    document.getElementById("edit-groups-trigger")?.click();
  };

  // Removed legacy local group handler; group creation/editing handled via RTK mutations

  const handleCloseModal = () => {
    setIsEditGroupsSheetOpen(false);
    setIsAddCategoryModalOpen(false);
    setIsAddGroupModalOpen(false);
    setSelectedCategory(null);
    setGroupName("");
    setOriginalGroupName("");
    setEditingGroupId(null);
    setCategoryTitle("");
    setDataSource("");
  };

  // const handleDeleteGroup = (categoryId: string) => {
  //   setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  // };

  // Handle drag end for groups in Edit Groups Sheet
  const handleGroupDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Get the current groups array
      const oldGroups = [...allGroups];

      // Find the indices of the dragged item and the drop target
      const oldIndex = oldGroups.findIndex((group: any) => group._id === active.id);
      const newIndex = oldGroups.findIndex((group: any) => group._id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Create a new array with the updated order
        const newGroups = [...oldGroups];
        const [movedItem] = newGroups.splice(oldIndex, 1);
        newGroups.splice(newIndex, 0, movedItem);

        // Prepare the payload for the API
        const payload = newGroups.map((group: any, index: number) => ({
          _id: group._id,
          serial: index + 1,
        }));

        // Call the API to update the order
        shuffleGroupSerial(payload)
          .unwrap()
          .then((res) => {
            toast.success(res?.message || "Groups reordered successfully");
          })
          .catch((err) => {
            toast.error(err?.data?.message || "Failed to reorder groups");
          });
      }
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

      {/* Legacy create group modal removed; creation/editing handled in Add Group Modal */}

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
                        onEdit={(id, name) => {
                          setEditingGroupId(id);
                          setOriginalGroupName(name);
                          setGroupName(name);
                          setIsAddGroupModalOpen(true);
                        }}
                        onDelete={async (id) => {
                          try {
                            const res = await deleteGroup(id).unwrap();
                            toast.success(
                              res?.message || "Group deleted successfully"
                            );
                          } catch (e: any) {
                            toast.error(
                              e?.data?.message || "Failed to delete group"
                            );
                          }
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

      {/* Add / Edit Category Modal */}
      <Dialog
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {selectedCategory
                ? "Update your category details."
                : "Create a new category to organize your contests."}
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
              <Select
                value={selectedGroup}
                onValueChange={setSelectedGroup}
                disabled={!!selectedCategory}
              >
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
              onClick={async () => {
                if (!categoryTitle.trim()) return;
                try {
                  if (selectedCategory) {
                    const res = await updateCategory({
                      id: selectedCategory.id,
                      name: categoryTitle,
                    }).unwrap();
                    toast.success(
                      res?.message || "Category updated successfully"
                    );
                  } else {
                    if (!selectedGroup) return;
                    const res = await createCategory({
                      name: categoryTitle,
                      groupId: selectedGroup,
                      url: dataSource,
                    }).unwrap();
                    toast.success(
                      res?.message || "Category created successfully"
                    );
                  }
                  handleCloseModal();
                } catch (e: any) {
                  toast.error(
                    e?.data?.message || "Action failed. Please try again."
                  );
                }
              }}
              disabled={
                (!!selectedCategory && isLoadingUpdateCategory) ||
                (!selectedCategory &&
                  (isLoadingCreateCategory || !selectedGroup)) ||
                !categoryTitle.trim()
              }
            >
              {selectedCategory
                ? isLoadingUpdateCategory
                  ? "Saving..."
                  : "Save Changes"
                : isLoadingCreateCategory
                ? "Creating..."
                : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Modal */}
      <Dialog open={isAddGroupModalOpen} onOpenChange={setIsAddGroupModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingGroupId ? "Edit Group" : "Add New Group"}
            </DialogTitle>
            <DialogDescription>
              {editingGroupId
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
              onClick={async () => {
                if (!groupName.trim()) return;
                try {
                  if (editingGroupId) {
                    const res = await updateGroup({
                      id: editingGroupId,
                      name: groupName,
                    }).unwrap();
                    toast.success(res?.message || "Group updated successfully");
                  } else {
                    const res = await createGroup({ name: groupName }).unwrap();
                    toast.success(res?.message || "Group created successfully");
                  }
                  handleCloseModal();
                } catch (e: any) {
                  toast.error(
                    e?.data?.message || "Action failed. Please try again."
                  );
                }
              }}
              disabled={
                !groupName.trim() ||
                isLoadingCreateGroup ||
                isLoadingUpdateGroup
              }
            >
              {editingGroupId
                ? isLoadingUpdateGroup
                  ? "Saving..."
                  : "Save Changes"
                : isLoadingCreateGroup
                ? "Adding..."
                : "Add Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizeContestsPage;
