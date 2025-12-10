"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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

  const handleDownloadExcel = () => {
    if (!allAnalyticsData) return;

    const wb = XLSX.utils.book_new();

    // 1. Financial Performance Sheet
    if (financialPerformance) {
      const financialData = [
        { Metric: "Total Revenue", Value: financialPerformance.totalRevenue },
        { Metric: "Net Profit", Value: financialPerformance.netProfit },
        { Metric: "Gross Margin", Value: financialPerformance.grossMargin },
        { Metric: "Refund Rate", Value: financialPerformance.refundRate },
      ];
      const wsFinancial = XLSX.utils.json_to_sheet(financialData);
      XLSX.utils.book_append_sheet(wb, wsFinancial, "Financial Performance");
    }

    // 2. Revenue Over Time Sheet
    if (revenueOverTime && Array.isArray(revenueOverTime)) {
      const wsRevenue = XLSX.utils.json_to_sheet(revenueOverTime);
      XLSX.utils.book_append_sheet(wb, wsRevenue, "Revenue Over Time");
    }

    // 3. Top Products Sheet
    if (topProductsByRevenue && Array.isArray(topProductsByRevenue)) {
      const wsProducts = XLSX.utils.json_to_sheet(topProductsByRevenue);
      XLSX.utils.book_append_sheet(wb, wsProducts, "Top Products");
    }

    // 4. User Activity Sheet
    if (userActivity) {
      const activityData = [
        { Metric: "Active Users", Value: userActivity.activeUsers },
        { Metric: "New Signups", Value: userActivity.newSignups },
        // Add more metrics if available in userActivity object
      ];
      const wsActivity = XLSX.utils.json_to_sheet(activityData);
      XLSX.utils.book_append_sheet(wb, wsActivity, "User Activity");
    }

    // 5. Geographic Distribution Sheet
    if (geographicDistribution && Array.isArray(geographicDistribution)) {
      const wsGeo = XLSX.utils.json_to_sheet(geographicDistribution);
      XLSX.utils.book_append_sheet(wb, wsGeo, "Geographic Distribution");
    }

    // Add more sheets as needed for other data sections

    // Generate Excel file
    XLSX.writeFile(wb, "Analytics_Report.xlsx");
  };

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
          <Button
            onClick={handleDownloadExcel}
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Excel
          </Button>
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
