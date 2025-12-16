import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const truncate = (text: string, length = 80) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
};

export const getRelativeTime = (createdAt: string) => {
  if (!createdAt) return "-";
  const now = new Date();
  const created = new Date(createdAt);
  const diffSec = Math.floor((now.getTime() - created.getTime()) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  const diffMon = Math.floor(diffDay / 30);
  if (diffMon < 12) return `${diffMon} month${diffMon > 1 ? "s" : ""} ago`;
  const diffYr = Math.floor(diffDay / 365);
  return `${diffYr} year${diffYr > 1 ? "s" : ""} ago`;
};

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "approved":
      return {
        bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dotClass: "bg-emerald-500",
        icon: CheckCircle2,
      };
    case "rejected":
      return {
        bgClass: "bg-red-50 text-red-700 border-red-200",
        dotClass: "bg-red-500",
        icon: XCircle,
      };
    default:
      return {
        bgClass: "bg-amber-50 text-amber-700 border-amber-200",
        dotClass: "bg-amber-500 animate-pulse",
        icon: Clock,
      };
  }
};

export interface CommunityPost {
  _id: string;
  title: string;
  description: string;
  userId: {
    name: string;
    email: string;
  };
  upvote: number;
  downvote: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
