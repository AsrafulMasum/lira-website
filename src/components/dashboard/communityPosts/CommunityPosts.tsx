"use client";

import Loading from "@/app/loading";
import {
  useChangeCommunityPostStatusMutation,
  useGetCommunityPostsQuery,
} from "@/redux/apiSlices/communitySlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const CommunityPosts = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useGetCommunityPostsQuery(undefined);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [changeCommunityPostStatus, { isLoading: isActionLoading }] =
    useChangeCommunityPostStatusMutation();

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const communityPosts = posts?.data || [];
  const openDetails = (post: any) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const truncate = (text: string, length = 80) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "…" : text;
  };

  const handleApprove = async () => {
    if (!selectedPost?._id) return;
    try {
      await changeCommunityPostStatus({
        postId: selectedPost._id,
        status: "approved",
      }).unwrap();
      toast.success("Post approved");
      setSelectedPost({ ...selectedPost, status: "approved" });
      await refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve post");
    }
    setIsOpen(false);
  };

  const handleReject = async () => {
    if (!selectedPost?._id) return;
    try {
      await changeCommunityPostStatus({
        postId: selectedPost._id,
        status: "rejected",
      }).unwrap();
      toast.success("Post rejected");
      setSelectedPost({ ...selectedPost, status: "rejected" });
      await refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject post");
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Community Posts</CardTitle>
          <p className="text-muted-foreground">Manage community posts</p>
        </CardHeader>
      </Card>

      <div className="bg-white shadow-md rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Up</TableHead>
              <TableHead>Down</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communityPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-500 py-6"
                >
                  No posts found
                </TableCell>
              </TableRow>
            ) : (
              communityPosts.map((post: any) => (
                <TableRow key={post?._id}>
                  <TableCell className="max-w-[220px]">
                    {truncate(post?.title, 10)}
                  </TableCell>
                  <TableCell className="max-w-[340px] text-gray-700">
                    {truncate(post?.description, 50)}
                  </TableCell>
                  <TableCell>{post?.userId?.name}</TableCell>
                  <TableCell>{post?.userId?.email}</TableCell>
                  <TableCell>{post?.upvote ?? 0}</TableCell>
                  <TableCell>{post?.downvote ?? 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post?.status === "pending"
                          ? "secondary"
                          : post?.status === "approved"
                          ? "default"
                          : post?.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {post?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post?.createdAt
                      ? (() => {
                          const now = new Date();
                          const created = new Date(post.createdAt);
                          const diffSec = Math.floor(
                            (now.getTime() - created.getTime()) / 1000
                          );
                          if (diffSec < 60) return `${diffSec}s ago`;
                          const diffMin = Math.floor(diffSec / 60);
                          if (diffMin < 60)
                            return `${diffMin} min${
                              diffMin > 1 ? "s" : ""
                            } ago`;
                          const diffHr = Math.floor(diffMin / 60);
                          if (diffHr < 24)
                            return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
                          const diffDay = Math.floor(diffHr / 24);
                          if (diffDay < 30)
                            return `${diffDay} day${
                              diffDay > 1 ? "s" : ""
                            } ago`;
                          const diffMon = Math.floor(diffDay / 30);
                          if (diffMon < 12)
                            return `${diffMon} month${
                              diffMon > 1 ? "s" : ""
                            } ago`;
                          const diffYr = Math.floor(diffDay / 365);
                          return `${diffYr} year${diffYr > 1 ? "s" : ""} ago`;
                        })()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetails(post)}
                      className="inline-flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Post Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-3 text-sm">
              <div className="">
                <div className="flex flex-col font-semibold gap-2 bg-gray-50 p-2 rounded-md mb-2">
                  <span className="font-medium">Title:</span>{" "}
                  {selectedPost?.title}
                </div>
                <div className="flex flex-col font-semibold gap-2 bg-gray-50 p-2 rounded-md">
                  <span className="font-medium">Description:</span>{" "}
                  {selectedPost?.description}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-medium">User:</span>{" "}
                  {selectedPost?.userId?.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedPost?.userId?.email}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-medium">Upvotes:</span>{" "}
                  {selectedPost?.upvote ?? 0}
                </div>
                <div>
                  <span className="font-medium">Downvotes:</span>{" "}
                  {selectedPost?.downvote ?? 0}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <Badge
                    variant={
                      selectedPost?.status === "pending"
                        ? "secondary"
                        : selectedPost?.status === "approved"
                        ? "default"
                        : selectedPost?.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedPost?.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {selectedPost?.createdAt
                    ? format(
                        new Date(selectedPost.createdAt),
                        "yyyy-MM-dd HH:mm"
                      )
                    : "-"}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleApprove}
                  disabled={
                    isActionLoading || selectedPost?.status === "approved"
                  }
                  className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle2 className="h-4 w-4" /> Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleReject}
                  disabled={
                    isActionLoading || selectedPost?.status === "rejected"
                  }
                  className="inline-flex items-center gap-1"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPosts;
