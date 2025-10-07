"use client";

import { Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { apiRequest } from "@/helpers/apiRequest";
import { revalidateTags } from "@/helpers/revalidateTags";

export default function Card({ post }: { post: any }) {
  const date = post?.createdAt;
  const duration = moment.duration(moment().diff(moment(date)));

  let timeAgo = "";

  if (duration.asMinutes() < 60) {
    timeAgo = Math.floor(duration.asMinutes()) + "m";
  } else if (duration.asHours() < 24) {
    timeAgo = Math.floor(duration.asHours()) + "h";
  } else if (duration.asDays() < 7) {
    timeAgo = Math.floor(duration.asDays()) + "d";
  } else {
    timeAgo = Math.floor(duration.asWeeks()) + "w";
  }

  const handleLike = async () => {
    try {
      const res = await apiRequest(`/community/upvote/${post?._id}`, {
        method: "PATCH",
      });

      if (res?.success) {
        revalidateTags(["posts"]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await apiRequest(`/community/downvote/${post?._id}`, {
        method: "PATCH",
      });

      if (res?.success) {
        revalidateTags(["posts"]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border bg-card p-6 shadow-sm">
      {/* Header with avatar and user info */}
      <div className="mb-4 flex items-center gap-3">
        {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {post?.userId?.name?.charAt(0)}
        </div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <rect
            y="0.5"
            width="20"
            height="20"
            rx="10"
            fill="url(#paint0_linear_709_3548)"
          />
          <path
            d="M10.4112 10.4782C16.5301 8.83746 14.7991 5.84095 10.321 10.3215C14.8015 5.84095 11.8026 4.11237 10.1642 10.2312C11.805 4.11237 8.34307 4.11237 9.98141 10.2312C8.34069 4.11 5.34418 5.84095 9.82233 10.3191C5.34418 5.84095 3.61323 8.83746 9.7321 10.4782C3.61323 8.83746 3.61323 12.2994 9.7321 10.661C3.61323 12.3017 5.34418 15.2983 9.82233 10.8177C5.3418 15.2983 8.34069 17.0268 9.97904 10.908C8.33832 17.0268 11.8002 17.0268 10.1619 10.908C11.8026 17.0268 14.7991 15.2959 10.3186 10.8177C14.7991 15.2983 16.5277 12.2994 10.4088 10.661C16.5301 12.2994 16.5301 8.83746 10.4112 10.4782Z"
            fill="#E6EBE8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_709_3548"
              x1="10"
              y1="0.5"
              x2="10"
              y2="20.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A39" />
              <stop offset="1" stopColor="#004721" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">
            {post?.userId?.name?.split(" ")[0]}
          </span>
          <span className="text-muted-foreground">{timeAgo}</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-3 text-[#002913] text-xl font-semibold leading-tight">
        {post?.title}
      </h2>

      {/* Engagement metrics */}
      <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4" />
          <span>{post?.upvote}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ThumbsDown className="h-4 w-4 " />
          <span>{post?.downvote}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-muted-foreground">{post?.description}</p>

      {/* Action bar */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer bg-bg hover:bg-bg/90 text-dark-primary hover:text-dark-primary border"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            onClick={handleDislike}
            variant="ghost"
            size="icon"
            className={`size-8 cursor-pointer ${
              post?.isDisliked
                ? "text-white hover:text-white bg-primary hover:bg-primary/90"
                : "bg-bg hover:bg-bg/90 text-dark-primary hover:text-dark-primary border"
            }`}
          >
            <ThumbsDown
              className={`size-4 ${post?.isDisliked && "fill-current"}`}
            />
          </Button>
          <Button
            onClick={handleLike}
            variant="ghost"
            size="icon"
            className={`size-8 cursor-pointer ${
              post?.isLiked
                ? "text-white hover:text-white bg-primary hover:bg-primary/90"
                : "bg-bg hover:bg-bg/90 text-dark-primary hover:text-dark-primary border"
            }`}
          >
            <ThumbsUp className={`size-4 ${post?.isLiked && "fill-current"}`} />
          </Button>
        </div>
        <Button
          className={`capitalize shadow-none ${
            post?.status === "live"
              ? "bg-primary hover:bg-primary/90 text-white"
              : "text-gray-text bg-bg hover:bg-bg/90"
          }`}
        >
          {post?.status}
        </Button>
      </div>
    </div>
  );
}
