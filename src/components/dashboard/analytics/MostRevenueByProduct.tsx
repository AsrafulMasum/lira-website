"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FilterState } from "./AnalyticsFilters";

interface ProductRevenue {
  name: string;
  revenue: number;
  formattedRevenue: string;
}

interface MostRevenueByProductProps {
  filters: FilterState;
}

// Mock data - in a real app, this would be fetched based on filters
const getProductRevenueData = (filters: FilterState): ProductRevenue[] => {
  return [
    { name: "Hermes Birkin", revenue: 4460, formattedRevenue: "$4,460" },
    { name: "AP Royal Oak", revenue: 3780, formattedRevenue: "$3,780" },
    { name: "Rolex Daytona", revenue: 3735, formattedRevenue: "$3,735" },
    { name: "Modern Villa", revenue: 2615, formattedRevenue: "$2,615" },
    { name: "Cartier Love Bracelet", revenue: 1248, formattedRevenue: "$1,248" },
    { name: "Diamond Studs", revenue: 890, formattedRevenue: "$890" },
  ];
};

export const MostRevenueByProduct = ({ filters }: MostRevenueByProductProps) => {
  const productData = getProductRevenueData(filters);
  const maxRevenue = Math.max(...productData.map(item => item.revenue));
  
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
          <h2 className="text-xl font-bold">Most Revenue by Product</h2>
        </div>
        
        <div className="space-y-4">
          {productData.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{product.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 rounded-full" 
                    style={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{product.formattedRevenue}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MostRevenueByProduct;