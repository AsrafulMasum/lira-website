"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { CommunityPost, getStatusConfig } from "./utils";

interface PostDetailsDialogProps {
  post: CommunityPost | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
  isActionLoading: boolean;
}

const PostDetailsDialog = ({
  post,
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
  isActionLoading,
}: PostDetailsDialogProps) => {
  if (!post) return null;

  const statusConfig = getStatusConfig(post.status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-xl">
        <div className="bg-emerald-600 p-5 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">Post Details</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-5 space-y-4">
          {/* Title & Description */}
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                <MessageSquare className="h-3.5 w-3.5" />
                Title
              </div>
              <p className="text-gray-800 font-medium">{post.title}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                <MessageSquare className="h-3.5 w-3.5" />
                Description
              </div>
              <p className="text-gray-700">{post.description}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                <User className="h-3.5 w-3.5" />
                User
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                  {post.userId?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <span className="text-gray-800 font-medium text-sm">
                  {post.userId?.name}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                <Mail className="h-3.5 w-3.5" />
                Email
              </div>
              <p className="text-gray-700 text-sm truncate">
                {post.userId?.email}
              </p>
            </div>
          </div>

          {/* Votes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium uppercase tracking-wider mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Upvotes
              </div>
              <p className="text-xl font-bold text-emerald-700">
                {post.upvote ?? 0}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 text-red-600 text-xs font-medium uppercase tracking-wider mb-1">
                <TrendingDown className="h-3.5 w-3.5" />
                Downvotes
              </div>
              <p className="text-xl font-bold text-red-600">
                {post.downvote ?? 0}
              </p>
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                Status
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.bgClass}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`}
                ></span>
                {post.status?.charAt(0).toUpperCase() + post.status?.slice(1)}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                <Clock className="h-3.5 w-3.5" />
                Created
              </div>
              <p className="text-gray-700 text-sm font-medium">
                {post.createdAt
                  ? format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")
                  : "-"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end gap-2 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="px-4"
            >
              Close
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onReject}
              disabled={isActionLoading || post.status === "rejected"}
              className="inline-flex items-center gap-1.5 px-4"
            >
              <XCircle className="h-4 w-4" /> Reject
            </Button>
            <Button
              size="sm"
              onClick={onApprove}
              disabled={isActionLoading || post.status === "approved"}
              className="inline-flex items-center gap-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle2 className="h-4 w-4" /> Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsDialog;
