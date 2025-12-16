"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Clock, MessageSquare } from "lucide-react";
import {
  CommunityPost,
  truncate,
  getRelativeTime,
  getStatusConfig,
} from "./utils";

interface PostsTableProps {
  posts: CommunityPost[];
  onViewPost: (post: CommunityPost) => void;
  hasFilters: boolean;
}

const PostsTable = ({ posts, onViewPost, hasFilters }: PostsTableProps) => {
  return (
    <div className="bg-white mt-5 shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-green-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Serial
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Title</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Description
            </TableHead>
            <TableHead className="font-semibold text-gray-700">User</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">
              <div className="flex items-center justify-center gap-1">Up</div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">
              <div className="flex items-center justify-center gap-1">Down</div>
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Created
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <MessageSquare className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {hasFilters
                      ? "No posts match your filters"
                      : "No posts found"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {hasFilters
                      ? "Try adjusting your search or filter criteria"
                      : "Community posts will appear here"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post, index) => {
              const statusConfig = getStatusConfig(post?.status);
              return (
                <TableRow
                  key={post?._id}
                  className={`transition-all duration-200 hover:bg-emerald-50/50 hover:shadow-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <TableCell className="max-w-[180px]">{index + 1}</TableCell>
                  <TableCell className="max-w-[180px]">
                    <span className="font-medium text-gray-800">
                      {truncate(post?.title, 15)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[280px]">
                    <span className="text-gray-600">
                      {truncate(post?.description, 40)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                        {post?.userId?.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {post?.userId?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-500 text-sm">
                      {post?.userId?.email}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                      {post?.upvote ?? 0}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 bg-red-50 text-red-600 rounded-full text-sm font-semibold">
                      {post?.downvote ?? 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bgClass}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${statusConfig.dotClass}`}
                      ></span>
                      {post?.status?.charAt(0).toUpperCase() +
                        post?.status?.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Clock className="h-3.5 w-3.5" />
                      {getRelativeTime(post?.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewPost(post)}
                      className="inline-flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
