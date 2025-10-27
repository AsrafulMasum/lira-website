"use client";

import { FilterIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { useGetAllCategoryQuery } from "@/redux/apiSlices/categoryUnitTypeSlice";
import Loading from "@/app/loading";

export interface FilterState {
  dateRange: string;
  category: string;
  gameType: string;
  userSegment: string;
  product: string;
  region: string;
}

interface AnalyticsFiltersProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

export default function AnalyticsFilters({
  filters,
  setFilters,
}: AnalyticsFiltersProps) {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data: getAllCategories, isLoading } =
    useGetAllCategoryQuery(undefined);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const categories = getAllCategories?.data || [];
  console.log(categories);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <FilterIcon className="h-8 w-8" />
          <span className="font-semibold text-lg">Filters</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <label className="text-xs font-medium">Date Range</label>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastDay">Last Day</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium">Category</label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="h-[300px] overflow-auto">
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category: any) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="space-y-3">
            <label className="text-xs font-medium">Game Type</label>
            <Select
              value={filters.gameType}
              onValueChange={(value) => handleFilterChange("gameType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Game Types</SelectItem>
                <SelectItem value="multiplayer">Multiplayer</SelectItem>
                <SelectItem value="single">Single Player</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium">User Segment</label>
            <Select
              value={filters.userSegment}
              onValueChange={(value) =>
                handleFilterChange("userSegment", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="new">New Users</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium">Product</label>
            <Select
              value={filters.product}
              onValueChange={(value) => handleFilterChange("product", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="product1">Product 1</SelectItem>
                <SelectItem value="product2">Product 2</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className="space-y-3">
            <label className="text-xs font-medium">Region</label>
            <Select
              value={filters.region}
              onValueChange={(value) => handleFilterChange("region", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alabama">Alabama</SelectItem>
                <SelectItem value="alaska">Alaska</SelectItem>
                <SelectItem value="arizona">Arizona</SelectItem>
                <SelectItem value="arkansas">Arkansas</SelectItem>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="colorado">Colorado</SelectItem>
                <SelectItem value="connecticut">Connecticut</SelectItem>
                <SelectItem value="delaware">Delaware</SelectItem>
                <SelectItem value="florida">Florida</SelectItem>
                <SelectItem value="georgia">Georgia</SelectItem>
                <SelectItem value="hawaii">Hawaii</SelectItem>
                <SelectItem value="idaho">Idaho</SelectItem>
                <SelectItem value="illinois">Illinois</SelectItem>
                <SelectItem value="indiana">Indiana</SelectItem>
                <SelectItem value="iowa">Iowa</SelectItem>
                <SelectItem value="kansas">Kansas</SelectItem>
                <SelectItem value="kentucky">Kentucky</SelectItem>
                <SelectItem value="louisiana">Louisiana</SelectItem>
                <SelectItem value="maine">Maine</SelectItem>
                <SelectItem value="maryland">Maryland</SelectItem>
                <SelectItem value="massachusetts">Massachusetts</SelectItem>
                <SelectItem value="michigan">Michigan</SelectItem>
                <SelectItem value="minnesota">Minnesota</SelectItem>
                <SelectItem value="mississippi">Mississippi</SelectItem>
                <SelectItem value="missouri">Missouri</SelectItem>
                <SelectItem value="montana">Montana</SelectItem>
                <SelectItem value="nebraska">Nebraska</SelectItem>
                <SelectItem value="nevada">Nevada</SelectItem>
                <SelectItem value="newHampshire">New Hampshire</SelectItem>
                <SelectItem value="newJersey">New Jersey</SelectItem>
                <SelectItem value="newMexico">New Mexico</SelectItem>
                <SelectItem value="newYork">New York</SelectItem>
                <SelectItem value="northCarolina">North Carolina</SelectItem>
                <SelectItem value="northDakota">North Dakota</SelectItem>
                <SelectItem value="ohio">Ohio</SelectItem>
                <SelectItem value="oklahoma">Oklahoma</SelectItem>
                <SelectItem value="oregon">Oregon</SelectItem>
                <SelectItem value="pennsylvania">Pennsylvania</SelectItem>
                <SelectItem value="rhodeIsland">Rhode Island</SelectItem>
                <SelectItem value="southCarolina">South Carolina</SelectItem>
                <SelectItem value="southDakota">South Dakota</SelectItem>
                <SelectItem value="tennessee">Tennessee</SelectItem>
                <SelectItem value="texas">Texas</SelectItem>
                <SelectItem value="utah">Utah</SelectItem>
                <SelectItem value="vermont">Vermont</SelectItem>
                <SelectItem value="virginia">Virginia</SelectItem>
                <SelectItem value="washington">Washington</SelectItem>
                <SelectItem value="westVirginia">West Virginia</SelectItem>
                <SelectItem value="wisconsin">Wisconsin</SelectItem>
                <SelectItem value="wyoming">Wyoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
