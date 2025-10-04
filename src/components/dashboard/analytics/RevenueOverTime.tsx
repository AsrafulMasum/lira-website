"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FilterState } from "./AnalyticsFilters";

interface RevenueOverTimeProps {
  filters: FilterState;
}

export const RevenueOverTime = ({ filters }: RevenueOverTimeProps) => {
  // In a real implementation, this would fetch data based on filters
  
  return (
    <Card className="col-span-1 lg:col-span-3 xl:col-span-2">
      <CardContent className="p-6">
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
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          <h2 className="text-xl font-bold">Revenue Over Time</h2>
        </div>
        
        <div className="h-[300px] w-full relative">
          {/* This would be a real chart in production */}
          <div className="absolute inset-0 flex items-end justify-between px-4">
            <div className="h-[70%] w-8 bg-blue-500 rounded-t-md"></div>
            <div className="h-[60%] w-8 bg-blue-500 rounded-t-md"></div>
            <div className="h-[80%] w-8 bg-blue-500 rounded-t-md"></div>
            <div className="h-[65%] w-8 bg-blue-500 rounded-t-md"></div>
            <div className="h-[90%] w-8 bg-blue-500 rounded-t-md"></div>
            <div className="h-[75%] w-8 bg-blue-500 rounded-t-md"></div>
          </div>
          
          <div className="absolute bottom-0 inset-x-0 flex justify-between px-4 pt-2 border-t">
            <div className="text-xs text-gray-500">Jan</div>
            <div className="text-xs text-gray-500">Feb</div>
            <div className="text-xs text-gray-500">Mar</div>
            <div className="text-xs text-gray-500">Apr</div>
            <div className="text-xs text-gray-500">May</div>
            <div className="text-xs text-gray-500">Jun</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueOverTime;