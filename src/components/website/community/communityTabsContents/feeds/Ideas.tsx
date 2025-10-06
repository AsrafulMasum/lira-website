import React from "react";
import Card from "./Card";
import { apiRequest } from "@/helpers/apiRequest";

const Ideas = async () => {
  const { data } = await apiRequest("/community/posts", {
    method: "GET",
    cache: "no-store",
    tags: ["posts"],
  });
  const posts = data?.result;

  return (
    <div className="space-y-4 pt-5 pb-10">
      {posts?.map((post: any) => (
        <Card key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default Ideas;
