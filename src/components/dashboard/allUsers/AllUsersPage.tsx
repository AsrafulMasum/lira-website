"use client";

import { useState } from "react";
import Loading from "@/app/loading";
import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/apiSlices/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  image: string;
  status: string;
  verified: boolean;
  agreeWithTerms: boolean;
  createdAt: string;
}

const AllUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery(currentPage);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToChangeStatus, setUserToChangeStatus] = useState<User | null>(
    null
  );
  const itemsPerPage = 10;
  const [changeUserStatus, { isLoading: isChangingStatus }] =
    useChangeUserStatusMutation();

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const users = usersData?.data || [];
  const totalPages = usersData?.meta?.totalPage || 1;

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // const handleStatusChange = async (user: User) => {
  //   try {
  //     const newStatus = user.status === "active" ? "blocked" : "active";
  //     await changeUserStatus({
  //       userId: user._id,
  //       status: newStatus,
  //     }).unwrap();

  //     toast.success(
  //       `User ${newStatus === "blocked" ? "blocked" : "activated"} successfully`
  //     );
  //   } catch (error) {
  //     toast.error("Failed to change user status");
  //     console.error("Status change error:", error);
  //   }
  // };

  const handleShowConfirmation = (user: User) => {
    setUserToChangeStatus(user);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!userToChangeStatus) return;

    try {
      const newStatus =
        userToChangeStatus.status === "active" ? "blocked" : "active";
      await changeUserStatus({
        userId: userToChangeStatus._id,
        status: newStatus,
      }).unwrap();

      toast.success(
        `User ${newStatus === "blocked" ? "blocked" : "activated"} successfully`
      );

      // Close the confirmation dialog
      setIsConfirmDialogOpen(false);
      setUserToChangeStatus(null);
    } catch (error) {
      toast.error("Failed to change user status");
      console.error("Status change error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Users</CardTitle>
          <p className="text-muted-foreground">
            Manage all users in the system
          </p>
        </CardHeader>
      </Card>

      <div className="rounded-lg bg-white shadow mt-10 overflow-hidden">
        <Table>
          <TableHeader className="bg-green-50">
            <TableRow>
              <TableHead className="w-14">Serial</TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User, index: number) => (
              <TableRow key={user._id}>
                <TableCell className="text-center font-medium">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>
                <TableCell>
                  {user.image ? (
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={
                          user.image && process.env.NEXT_PUBLIC_IMAGE_BASE_URL
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${user.image}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}`
                        }
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(user.name);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>
                  <Badge
                    variant={user.verified ? "default" : "outline"}
                    className={
                      user.verified
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {user.verified ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </TableCell>

                <TableCell className="space-x-2 text-right">
                  <Button
                    className="bg-green-100 text-black cursor-pointer"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewUser(user)}
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {user.status === "active" ? (
                    <Button
                      className="bg-red-700 text-white cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShowConfirmation(user)}
                      disabled={isChangingStatus}
                      title="Block User"
                    >
                      <Lock className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-700 text-white cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShowConfirmation(user)}
                      disabled={isChangingStatus}
                      title="Activate User"
                    >
                      <Unlock className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isFetching}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Number Buttons */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Calculate page numbers to show (centered around current page)
            let pageNum;
            if (totalPages <= 5) {
              // If 5 or fewer pages, show all pages
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              // If near the start, show first 5 pages
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              // If near the end, show last 5 pages
              pageNum = totalPages - 4 + i;
            } else {
              // Otherwise show current page and 2 pages on each side
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handlePageChange(pageNum)}
                disabled={isFetching}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isFetching}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p>{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant={
                      selectedUser.status === "active"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      selectedUser.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Verified</p>
                  <Badge
                    variant={selectedUser.verified ? "default" : "outline"}
                    className={
                      selectedUser.verified
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedUser.verified ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Agreed to Terms
                  </p>
                  <Badge
                    variant={
                      selectedUser.agreeWithTerms ? "default" : "outline"
                    }
                    className={
                      selectedUser.agreeWithTerms
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedUser.agreeWithTerms ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">
                    Created At
                  </p>
                  <p>{format(new Date(selectedUser.createdAt), "PPP")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-xs font-mono bg-gray-100 p-1 rounded">
                    {selectedUser._id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          {userToChangeStatus && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to{" "}
                <span className="font-semibold">
                  {userToChangeStatus.status === "active"
                    ? "block"
                    : "activate"}
                </span>{" "}
                the user{" "}
                <span className="font-semibold">{userToChangeStatus.name}</span>
                ?
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsConfirmDialogOpen(false);
                    setUserToChangeStatus(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={
                    userToChangeStatus.status === "active"
                      ? "destructive"
                      : "default"
                  }
                  onClick={handleConfirmStatusChange}
                  disabled={isChangingStatus}
                >
                  {userToChangeStatus.status === "active"
                    ? "Block User"
                    : "Activate User"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsersPage;
