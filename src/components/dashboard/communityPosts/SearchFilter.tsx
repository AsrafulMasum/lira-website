"use client";

import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCount: number;
  totalCount: number;
}

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  filteredCount,
  totalCount,
}: SearchFilterProps) => {
  const hasActiveFilters = searchQuery || statusFilter !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, description, user, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Filter Results Info */}
      {hasActiveFilters && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">
            Showing {filteredCount} of {totalCount} posts
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
