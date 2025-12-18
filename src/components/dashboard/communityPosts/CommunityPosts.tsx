"use client";

import Loading from "@/app/loading";
import {
  useChangeCommunityPostStatusMutation,
  useGetCommunityPostsQuery,
} from "@/redux/apiSlices/communitySlice";
import { useState } from "react";
import { toast } from "sonner";
import { CommunityPost } from "./utils";
import StatsHeader from "./StatsHeader";
import SearchFilter from "./SearchFilter";
import PostsTable from "./PostsTable";
import PostDetailsDialog from "./PostDetailsDialog";

const CommunityPosts = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useGetCommunityPostsQuery(undefined);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");

  const [changeCommunityPostStatus, { isLoading: isActionLoading }] =
    useChangeCommunityPostStatusMutation();

  if (isLoading) return <Loading />;

  const communityPosts: CommunityPost[] = posts?.data || [];

  const openDetails = (post: CommunityPost) => {
    setSelectedPost(post);
    setIsOpen(true);
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

  // Stats calculation
  const totalPosts = communityPosts.length;
  const pendingPosts = communityPosts.filter(
    (p) => p.status === "pending"
  ).length;
  const approvedPosts = communityPosts.filter(
    (p) => p.status === "approved"
  ).length;

  // Filter posts based on search query and status filter
  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post?.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const hasFilters = searchQuery !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <StatsHeader
        totalPosts={totalPosts}
        pendingPosts={pendingPosts}
        approvedPosts={approvedPosts}
      />

      {/* Search, Filter, and Table Section */}
      <div className="bg-white min-h-screen rounded-xl p-4 border border-gray-200 shadow-sm">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCount={filteredPosts.length}
          totalCount={communityPosts.length}
        />

        <PostsTable
          posts={filteredPosts}
          onViewPost={openDetails}
          hasFilters={hasFilters}
        />
      </div>

      {/* Details Dialog */}
      <PostDetailsDialog
        post={selectedPost}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onApprove={handleApprove}
        onReject={handleReject}
        isActionLoading={isActionLoading}
      />
    </div>
  );
};

export default CommunityPosts;
