import React from "react";
import Card from "./Card";
import { apiRequest } from "@/helpers/apiRequest";

const Ideas = async ({ from }: { from: string }) => {
  // console.log(from);
  const { data } = await apiRequest("/community/posts", {
    method: "GET",
    cache: "no-store",
    tags: ["posts"],
  });
  const posts = data?.result;

  const { data: voted } = await apiRequest("/community/voted-posts", {
    method: "GET",
    cache: "no-store",
    tags: ["voted-posts"],
  });

  const { data: myPosts } = await apiRequest("/community/my-posts", {
    method: "GET",
    cache: "no-store",
    tags: ["my-posts"],
  });

  return (
    <div className="space-y-4 pt-5 pb-10">
      {from === "feeds" &&
        posts?.map((post: any) => <Card key={post?._id} post={post} />)}

      {from === "upvotes" &&
        voted?.map((post: any) => <Card key={post?._id} post={post} />)}

      {from === "my-ideas" &&
        myPosts?.map((post: any) => <Card key={post?._id} post={post} />)}
    </div>
  );
};

export default Ideas;
