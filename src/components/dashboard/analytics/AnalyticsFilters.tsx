"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type FilterState = {
  dateRange: string;
  category: string;
  gameType: string;
  userSegment: string;
  product: string;
  region: string;
};

// Default filter values
export const defaultFilters: FilterState = {
  dateRange: "lastMonth",
  category: "all",
  gameType: "all",
  userSegment: "all",
  product: "all",
  region: "all",
};

interface AnalyticsFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

export const AnalyticsFilters = ({
  filters,
  onFilterChange,
}: AnalyticsFiltersProps) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleResetFilters = () => {
    onFilterChange(defaultFilters);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <h3 className="font-medium text-gray-900 text-lg">Filters</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="text-sm"
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Date Range
          </label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => handleFilterChange("dateRange", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Game Type</label>
          <Select
            value={filters.gameType}
            onValueChange={(value) => handleFilterChange("gameType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select game type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Game Types</SelectItem>
              <SelectItem value="prediction">Prediction</SelectItem>
              <SelectItem value="auction">Auction</SelectItem>
              <SelectItem value="raffle">Raffle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            User Segment
          </label>
          <Select
            value={filters.userSegment}
            onValueChange={(value) => handleFilterChange("userSegment", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="new">New Users</SelectItem>
              <SelectItem value="returning">Returning Users</SelectItem>
              <SelectItem value="premium">Premium Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Product</label>
          <Select
            value={filters.product}
            onValueChange={(value) => handleFilterChange("product", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="hermes">Hermès Birkin</SelectItem>
              <SelectItem value="rolex">Rolex Daytona</SelectItem>
              <SelectItem value="ap">AP Royal Oak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Region</label>
          <Select
            value={filters.region}
            onValueChange={(value) => handleFilterChange("region", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="na">North America</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
