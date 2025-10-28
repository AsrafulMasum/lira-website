"use client";

import Loading from "@/app/loading";
import {
  useGetAllUnitOrTypeQuery,
  useCreateUnitOrTypeMutation,
  useUpdateUnitOrTypeMutation,
} from "@/redux/apiSlices/categoryUnitTypeSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLineIcon, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TypesManagement = () => {
  const { data: getAllTypes, isLoading } = useGetAllUnitOrTypeQuery("type");
  const [createUnitOrType] = useCreateUnitOrTypeMutation();
  const [updateUnitOrType, { isLoading: isUpdating }] =
    useUpdateUnitOrTypeMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTypeTitle, setNewTypeTitle] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTypeTitle, setEditTypeTitle] = useState("");
  const [editTypeId, setEditTypeId] = useState("");

  const handleAddType = async () => {
    if (!newTypeTitle.trim()) return;

    try {
      await createUnitOrType({
        content: newTypeTitle,
        key: "type",
      }).unwrap();

      toast.success("Type added successfully");
      setNewTypeTitle("");
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add type");
    }
  };

  const openEditModal = (id: string, title: string) => {
    setEditTypeId(id);
    setEditTypeTitle(title);
    setIsEditModalOpen(true);
  };

  const handleEditType = async () => {
    if (!editTypeTitle.trim()) return;

    try {
      await updateUnitOrType({
        id: editTypeId,
        content: editTypeTitle,
      }).unwrap();

      toast.success("Type updated successfully");
      setEditTypeTitle("");
      setEditTypeId("");
      setIsEditModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update type");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const types = getAllTypes?.data || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Types Management</CardTitle>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Type
        </Button>
      </CardHeader>
      <CardContent>
        {types.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No types found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types?.map((type: any, i: number) => (
                <TableRow key={type._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {type.content}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="px-3 py-1 cursor-pointer text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => openEditModal(type._id, type.content)}
                      >
                        <PenLineIcon className="w-5 h-5" />
                      </button>
                      <button className="px-3 py-1 cursor-pointer text-sm bg-red-600 text-white rounded hover:bg-red-700">
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Add Type Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="content"
                value={newTypeTitle}
                onChange={(e) => setNewTypeTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter type title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddType}>Add Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Type Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-type-title"
                value={editTypeTitle}
                onChange={(e) => setEditTypeTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEditType}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TypesManagement;
