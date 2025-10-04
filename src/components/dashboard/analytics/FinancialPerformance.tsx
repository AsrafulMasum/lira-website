"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FilterState } from "./AnalyticsFilters";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  changePositive: boolean;
}

const MetricCard = ({ icon, value, label, change, changePositive }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
          <div className={`text-sm font-medium flex items-center ${changePositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </CardContent>
    </Card>
  );
};

interface FinancialPerformanceProps {
  filters: FilterState;
}

// This would normally come from an API based on filters
const getFinancialData = (filters: FilterState) => {
  // Mock data - in a real app, this would be fetched based on filters
  return {
    totalRevenue: {
      value: "$127,450",
      change: "+12.5%",
      positive: true
    },
    avgRevenuePerUser: {
      value: "$59.12",
      change: "+8.3%",
      positive: true
    },
    avgSpendPerUser: {
      value: "$47.85",
      change: "+5.7%",
      positive: true
    }
  };
};

export const FinancialPerformance = ({ filters }: FinancialPerformanceProps) => {
  const financialData = getFinancialData(filters);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <h2 className="text-xl font-bold">Financial Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
          value={financialData.totalRevenue.value}
          label="Total Revenue"
          change={financialData.totalRevenue.change}
          changePositive={financialData.totalRevenue.positive}
        />

        <MetricCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          }
          value={financialData.avgRevenuePerUser.value}
          label="Avg Revenue per User"
          change={financialData.avgRevenuePerUser.change}
          changePositive={financialData.avgRevenuePerUser.positive}
        />

        <MetricCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
            </svg>
          }
          value={financialData.avgSpendPerUser.value}
          label="Avg Spend per User"
          change={financialData.avgSpendPerUser.change}
          changePositive={financialData.avgSpendPerUser.positive}
        />
      </div>
    </div>
  );
};

export default FinancialPerformance;