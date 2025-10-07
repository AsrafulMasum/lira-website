"use client";

import { useState } from "react";

// Import the new components
import AnalyticsFilters, { FilterState } from "./AnalyticsFilters";
import FinancialPerformance from "./FinancialPerformance";
import RevenueOverTime from "./RevenueOverTime";
import MostRevenueByProduct from "./MostRevenueByProduct";
import PriceSensitivity from "./PriceSensitivity";
import UserActivity from "./UserActivity";
import LoyaltyAndStreak from "./LoyaltyAndStreak";
import GeographicDistribution from "./GeographicDistribution";
import UserEngagement from "./UserEngagement";

export default function AnalyticsPage() {
  // State for filters that will be shared with all components
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "last-month",
    category: "all",
    gameType: "all",
    userSegment: "all",
    product: "all",
    region: "all",
  });

  return (
    <div className="min-h-screen bg-white rounded-2xl p-6 md:p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Monitor performance and user engagement
            </p>
          </div>
        </div>

        {/* Filters Component */}
        <AnalyticsFilters filters={filters} setFilters={setFilters} />

        {/* Financial Performance Component */}
        <FinancialPerformance />

        {/* Revenue Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueOverTime />
          <MostRevenueByProduct />
        </div>

        {/* Price Sensitivity Component */}
        <PriceSensitivity />

        {/* User Engagement Component */}
        <UserEngagement filters={filters} />

        {/* User Activity Component */}
        <UserActivity />

        {/* Loyalty & Streak Component */}
        <LoyaltyAndStreak filters={filters} />

        {/* Geographic Distribution Component */}
        <GeographicDistribution filters={filters} />
      </div>
    </div>
  );
}
