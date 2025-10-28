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
import { useGetDashboardAnalyticsQuery } from "@/redux/apiSlices/publicSlice";
import Loading from "@/app/loading";

export default function AnalyticsPage() {
  // State for filters that will be shared with all components
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "lastWeek",
    category: "all",
    gameType: "all",
    userSegment: "all",
    product: "all",
    region: "all",
  });

  // Pass all filters to the query, the API endpoint will handle filtering out 'all' values
  const { data: analyticsData, isLoading } =
    useGetDashboardAnalyticsQuery(filters);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const allAnalyticsData = analyticsData?.data;

  const financialPerformance = allAnalyticsData?.financialPerformance;
  const revenueOverTime = allAnalyticsData?.revenueOverTime;
  const topProductsByRevenue = allAnalyticsData?.topProductsByRevenue;
  const entryPriceSensitivity = allAnalyticsData?.entryPriceSensitivity;
  const userEngagementAndGrowth = allAnalyticsData?.userEngagementAndGrowth;
  const userActivity = allAnalyticsData?.userActivity;
  const loyaltyMetrics = allAnalyticsData?.loyaltyMetrics;
  const geographicDistribution = allAnalyticsData?.geographicDistribution;

  console.log(allAnalyticsData);

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
        <FinancialPerformance financialPerformance={financialPerformance} />

        {/* Revenue Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueOverTime revenueOverTime={revenueOverTime} />
          <MostRevenueByProduct topProductsByRevenue={topProductsByRevenue} />
        </div>

        {/* Price Sensitivity Component */}
        <PriceSensitivity entryPriceSensitivity={entryPriceSensitivity} />

        {/* User Engagement Component */}
        <UserEngagement userEngagementAndGrowth={userEngagementAndGrowth} />

        {/* User Activity Component */}
        <UserActivity userActivity={userActivity} />

        {/* Loyalty & Streak Component */}
        <LoyaltyAndStreak loyaltyMetrics={loyaltyMetrics} />

        {/* Geographic Distribution Component */}
        <GeographicDistribution
          geographicDistribution={geographicDistribution}
        />
      </div>
    </div>
  );
}
