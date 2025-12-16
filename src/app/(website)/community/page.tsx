import CommunityTabs from "@/components/website/community/CommunityTabs";
import { apiRequest } from "@/helpers/apiRequest";
import React from "react";

const page = async ({ searchParams }: { searchParams: any }) => {
  const resolvedSearchParams = await searchParams;
  const sort = resolvedSearchParams?.filter || "New";
  const query = resolvedSearchParams?.q || "";

  const queryParams = new URLSearchParams();
  console.log(sort);
  if (query) queryParams.append("searchTerm", query);
  if (sort === "New") queryParams.append("sort", "createdAt");
  if (sort === "Most Popular") queryParams.append("sort", "-upvote");

  const { data } = await apiRequest(
    `/community/posts?${queryParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
      tags: ["posts"],
    }
  );
  const posts = data?.filter((post: any) => post.status === "approved") || [];
  const { data: voted } = await apiRequest(
    `/community/voted-posts?${queryParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
      tags: ["voted-posts"],
    }
  );

  const { data: myPosts } = await apiRequest(
    `/community/my-posts?${queryParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
      tags: ["my-posts"],
    }
  );

  return (
    <section className="bg-[#FAFFFC] min-h-[calc(100vh-64px)] pt-5">
      <CommunityTabs posts={posts} voted={voted} myPosts={myPosts} />
    </section>
  );
};

export default page;
