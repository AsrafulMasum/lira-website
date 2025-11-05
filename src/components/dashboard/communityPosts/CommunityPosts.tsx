"use client";

import Loading from "@/app/loading";
import { useGetCommunityPostsQuery } from "@/redux/apiSlices/communitySlice";
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
import { Eye } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const CommunityPosts = () => {
  const { data: posts, isLoading } = useGetCommunityPostsQuery(undefined);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const communityPosts = posts?.data?.result || [];
  const openDetails = (post: any) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const truncate = (text: string, length = 80) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "…" : text;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Community Posts</h2>
        <div className="text-sm text-gray-500">
          Total: {posts?.data?.meta?.total ?? communityPosts.length} • Page{" "}
          {posts?.data?.meta?.page ?? 1} of {posts?.data?.meta?.totalPage ?? 1}
        </div>
      </div>

      <div className="rounded-md border">
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
                        post?.status === "approved"
                          ? "default"
                          : post?.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {post?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post?.createdAt
                      ? format(new Date(post.createdAt), "yyyy-MM-dd HH:mm")
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
              <div className="flex items-center gap-2">
                <span className="font-medium">Title:</span>{" "}
                {selectedPost?.title}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Description:</span>{" "}
                {selectedPost?.description}
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
                      selectedPost?.status === "approved"
                        ? "default"
                        : selectedPost?.status === "rejected"
                        ? "destructive"
                        : "outline"
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
                {/* Placeholder for future actions like Approve/Reject */}
                <Button variant="outline" onClick={() => setIsOpen(false)}>
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
