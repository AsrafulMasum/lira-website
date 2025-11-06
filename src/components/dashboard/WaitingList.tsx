"use client";

import { useState } from "react";
import Loading from "@/app/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import {
  useDeleteWaitingListMutation,
  useGetAllWaitingListQuery,
} from "@/redux/apiSlices/publicSlice";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const WaitingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: waitingList, isLoading } = useGetAllWaitingListQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [deleteWaitingList, { isLoading: isDeleteLoading }] =
    useDeleteWaitingListMutation();

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const waitingListData = waitingList?.data || [];
  const meta = waitingList?.meta || {
    page: 1,
    limit: itemsPerPage,
    total: 0,
    totalPage: 1,
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteWaitingList(deleteId).unwrap();
      toast.success("Wait list deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete wait list");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(meta.totalPage || 1, p + 1));
  };

  const getPageNumbers = (total: number, current: number) => {
    const pages: number[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (current > 3) pages.push(-1); // ellipsis
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push(-2); // ellipsis
    pages.push(total);
    return pages;
  };

  const pageNumbers = getPageNumbers(meta.totalPage || 1, meta.page || 1);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Waiting List</CardTitle>
          <p className="text-muted-foreground">
            Users who joined contest waitlist
          </p>
        </CardHeader>
      </Card>

      {waitingListData.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="font-medium text-lg mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              There are no users in the waiting list yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contest</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitingListData.map((item: any) => {
                const user = item?.userId || {};
                const contest = item?.contestId || {};
                return (
                  <TableRow key={item?._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.image || ""}
                            alt={user?.name || "User"}
                          />
                          <AvatarFallback>
                            {(user?.name?.[0] || "U").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name || "—"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user?.email || "—"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {contest?.name || "—"}
                    </TableCell>
                    <TableCell>{contest?.group || "—"}</TableCell>
                    <TableCell>{contest?.category || "—"}</TableCell>
                    <TableCell className="text-gray-600">
                      {item?.createdAt
                        ? moment(item.createdAt).format("MMM D, YYYY h:mm A")
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer hover:bg-red-800"
                        onClick={() => handleDeleteClick(item?._id)}
                      >
                        <FaTrash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border-t">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Page {meta.page} of {meta.totalPage}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setItemsPerPage(Number(e.target.value));
                  }}
                  className="border border-gray-300 rounded-md p-1 bg-white"
                >
                  <option value={3}>3</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Prev */}
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={meta.page <= 1}
                className="cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {/* Numbered pages */}
              {pageNumbers.map((n, idx) =>
                n > 0 ? (
                  <Button
                    key={`pg-${idx}`}
                    variant={meta.page === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(n)}
                    className="cursor-pointer"
                  >
                    {n}
                  </Button>
                ) : (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                    …
                  </span>
                )
              )}
              {/* Next */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={meta.page >= meta.totalPage}
                className="cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Waitlist Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete it? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" onClick={() => { setIsDeleteDialogOpen(false); setDeleteId(null); }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={handleConfirmDelete}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WaitingList;
