"use client";

import { Users, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

interface StatsHeaderProps {
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
}

const StatsHeader = ({
  totalPosts,
  pendingPosts,
  approvedPosts,
}: StatsHeaderProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Users className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Posts</h1>
          <p className="text-gray-500 text-sm">
            Manage and moderate community contributions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
            <MessageSquare className="h-4 w-4" />
            Total Posts
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalPosts}</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Pending Review
          </div>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {pendingPosts}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Approved
          </div>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {approvedPosts}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
