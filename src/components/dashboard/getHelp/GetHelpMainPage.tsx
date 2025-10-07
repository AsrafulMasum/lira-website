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
import { Eye } from "lucide-react";

// Mock data for help messages
const helpMessages = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    userEmail: "john@example.com",
    userAvatar: "/avatars/john.jpg",
    subject: "Payment Issue",
    message:
      "I'm having trouble with my recent payment. The transaction was completed but it's not showing in my account. Can you please help me resolve this issue? I've attached the transaction receipt for your reference.",
    status: "open",
    priority: "high",
    createdAt: new Date(2023, 10, 15),
    attachments: ["receipt.pdf"],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    userAvatar: "/avatars/jane.jpg",
    subject: "Account Access",
    message:
      "I can't log into my account. I've tried resetting my password multiple times but I'm still unable to access my dashboard. Please help me regain access to my account as soon as possible.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(2023, 10, 18),
    attachments: [],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Robert Johnson",
    userEmail: "robert@example.com",
    userAvatar: "/avatars/robert.jpg",
    subject: "Refund Request",
    message:
      "I would like to request a refund for my recent purchase. The product doesn't meet my expectations and I'd like to return it. I've already initiated the return process and the product should reach your warehouse within 3-5 business days.",
    status: "closed",
    priority: "low",
    createdAt: new Date(2023, 10, 10),
    attachments: ["return_label.pdf"],
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    userAvatar: "/avatars/emily.jpg",
    subject: "Feature Request",
    message:
      "I would love to see a dark mode option in the app. It would be much easier on the eyes when using the app at night. This feature would greatly enhance user experience for night owls like me!",
    status: "open",
    priority: "medium",
    createdAt: new Date(2023, 10, 20),
    attachments: [],
  },
  {
    id: "5",
    userId: "user5",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    userAvatar: "/avatars/michael.jpg",
    subject: "Technical Issue",
    message:
      "The dashboard is not loading properly on my browser. I'm using Chrome version 96.0.4664.110 on Windows 10. The charts and graphs are not rendering correctly. I've attached a screenshot of the issue for your reference.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(2023, 10, 22),
    attachments: ["screenshot.png"],
  },
];

const GetHelpMainPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<
    (typeof helpMessages)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewMessage = (message: (typeof helpMessages)[0]) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Help Messages</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {helpMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.id}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.userName}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(message.status)}>
                    {message.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(message.priority)}>
                    {message.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(message.createdAt, { addSuffix: true })}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between items-center mt-2">
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {selectedMessage.status}
                    </Badge>
                    <Badge
                      className={getPriorityColor(selectedMessage.priority)}
                    >
                      {selectedMessage.priority}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* User Profile */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md">
                  <Avatar>
                    <AvatarImage src={selectedMessage.userAvatar} />
                    <AvatarFallback>
                      {selectedMessage.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedMessage.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedMessage.userEmail}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {formatDistanceToNow(selectedMessage.createdAt, {
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

                {/* Attachments */}
                {selectedMessage.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-gray-100 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          <span className="text-sm">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Reply</h4>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Type your reply here..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" className="mr-2">
                      Close Ticket
                    </Button>
                    <Button>Send Reply</Button>
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
