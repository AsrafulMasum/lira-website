"use client";

import Loading from "@/app/loading";
import { useGetAllUnitOrTypeQuery, useCreateUnitOrTypeMutation, useUpdateUnitOrTypeMutation } from "@/redux/apiSlices/categoryUnitTypeSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const UnitManagement = () => {
  const { data: getAllUnits, isLoading } = useGetAllUnitOrTypeQuery("unit");
  const [createUnitOrType, { isLoading: isCreating }] = useCreateUnitOrTypeMutation();
  const [updateUnitOrType, { isLoading: isUpdating }] = useUpdateUnitOrTypeMutation();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState("");
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUnitTitle, setEditUnitTitle] = useState("");
  const [editUnitId, setEditUnitId] = useState("");

  const handleAddUnit = async () => {
    if (!newUnitTitle.trim()) return;
    
    try {
      await createUnitOrType({ 
        content: newUnitTitle,
        key: "unit"
      }).unwrap();
      
      toast.success("Unit added successfully");
      setNewUnitTitle("");
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add unit");
    }
  };
  
  const openEditModal = (id: string, title: string) => {
    setEditUnitId(id);
    setEditUnitTitle(title);
    setIsEditModalOpen(true);
  };
  
  const handleEditUnit = async () => {
    if (!editUnitTitle.trim()) return;
    
    try {
      await updateUnitOrType({
        id: editUnitId,
        content: editUnitTitle
      }).unwrap();
      
      toast.success("Unit updated successfully");
      setEditUnitTitle("");
      setEditUnitId("");
      setIsEditModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update unit");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const units = getAllUnits?.data || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Units Management</CardTitle>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Unit
        </Button>
      </CardHeader>
      <CardContent>
        {units.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No units found</div>
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
              {units?.map((unit: any, i: number) => (
                <TableRow key={unit._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {unit.content}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                        <button 
                          className="px-3 py-1 cursor-pointer text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => openEditModal(unit._id, unit.content)}
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

      {/* Add Unit Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Unit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="content"
                value={newUnitTitle}
                onChange={(e) => setNewUnitTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter unit title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUnit}>Add Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-unit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-unit-title"
                value={editUnitTitle}
                onChange={(e) => setEditUnitTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditUnit} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UnitManagement;
