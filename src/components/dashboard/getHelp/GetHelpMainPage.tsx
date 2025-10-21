"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Eye, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import {
  useGetAllHelpQuery,
  useUpdateHelpStatusMutation,
} from "@/redux/apiSlices/publicSlice";
import Loading from "@/app/loading";
import { toast } from "sonner";

const GetHelpMainPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [replyText, setReplyText] = useState("");

  const { data: getAllHelpMessages, isLoading } = useGetAllHelpQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [updateHelpStatus, { isLoading: isUpdating }] =
    useUpdateHelpStatusMutation();

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const helpMessages = getAllHelpMessages?.data || [];
  const meta = getAllHelpMessages?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };
  console.log(helpMessages);

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    setReplyText(""); // Reset reply text when opening a new message
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    toast.loading("Sending reply...", { id: "send-reply" });

    try {
      await updateHelpStatus({
        id: selectedMessage._id,
        data: {
          reply: replyText.trim(),
          status: "resolved",
        },
      }).unwrap();

      toast.success("Reply sent successfully", { id: "send-reply" });

      // Reset and close dialog after successful reply
      setReplyText("");
      setIsDialogOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast.error("Failed to send reply. Please try again.", {
        id: "send-reply",
      });
    }
  };

  const handleCloseTicket = async () => {
    if (!selectedMessage) return;

    toast.loading("Closing ticket...", { id: "close-ticket" });

    try {
      await updateHelpStatus({
        id: selectedMessage._id,
        data: {
          status: "resolved",
        },
      }).unwrap();

      toast.success("Ticket closed successfully", { id: "close-ticket" });

      // Close dialog after successful status update
      setIsDialogOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to close ticket:", error);
      toast.error("Failed to close ticket. Please try again.", {
        id: "close-ticket",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-md min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Help Messages</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-green-50">
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {helpMessages?.map((message: any, index: number) => (
              <TableRow key={message._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>{message.userId.name}</TableCell>
                <TableCell>{message.userId.email}</TableCell>
                <TableCell>{message.message}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(message.status)}>
                    {message.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {message.createdAt
                    ? formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, meta.total)} of {meta.total}{" "}
            entries
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(
              (page) => {
                // Show first page, last page, current page, and pages around current page
                const showPage =
                  page === 1 ||
                  page === meta.totalPage ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage && page === 2 && currentPage > 4) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }

                if (
                  !showPage &&
                  page === meta.totalPage - 1 &&
                  currentPage < meta.totalPage - 3
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                );
              }
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.totalPage}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>Help Request Details</DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between items-center mt-2">
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {selectedMessage.status}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* User Profile */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md">
                  <Avatar>
                    <AvatarImage src={selectedMessage.userId?.avatar} />
                    <AvatarFallback>
                      {selectedMessage.userId?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedMessage.userId?.name || "Unknown User"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedMessage.userId?.email || selectedMessage.email}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {selectedMessage.createdAt &&
                      formatDistanceToNow(new Date(selectedMessage.createdAt), {
                        addSuffix: true,
                      })}
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-4 border rounded-md">
                  <p className="whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Section */}
                {selectedMessage.reply !== "" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="text-sm mb-2 text-green-800">Admin Reply</h4>
                    <p className="text-green-700">{selectedMessage.reply}</p>
                  </div>
                )}

                {/* Reply Section */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Reply</h4>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={handleCloseTicket}
                      disabled={isUpdating}
                    >
                      Close Ticket
                    </Button>
                    <Button
                      onClick={handleSendReply}
                      disabled={isUpdating || !replyText.trim()}
                    >
                      {isUpdating ? "Sending..." : "Send Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetHelpMainPage;
