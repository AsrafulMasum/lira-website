"use client";

import { useState } from "react";
import AnalyticsFilters, {
  FilterState,
} from "@/components/dashboard/analytics/AnalyticsFilters";
import FinancialPerformance from "@/components/dashboard/analytics/FinancialPerformance";
import RevenueOverTime from "@/components/dashboard/analytics/RevenueOverTime";
import MostRevenueByProduct from "@/components/dashboard/analytics/MostRevenueByProduct";

const AnalyticsMainPage = () => {
  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "last-month",
    category: "all",
    gameType: "all",
    userSegment: "all",
    product: "all",
    region: "all",
  });

  // Handle filter changes
  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Analytics</h1>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <AnalyticsFilters
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />
      </div>

      {/* Financial Performance Metrics */}
      <FinancialPerformance filters={filters} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <RevenueOverTime filters={filters} />
        <MostRevenueByProduct filters={filters} />
      </div>
    </div>
  );
};

export default AnalyticsMainPage;
