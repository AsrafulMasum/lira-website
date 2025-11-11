import React from "react";
import Card from "./Card";

interface Props {
  from: string;
  posts?: any;
  voted?: any;
  myPosts?: any;
}

const Ideas = async ({ from, posts, voted, myPosts }: Props) => {

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
