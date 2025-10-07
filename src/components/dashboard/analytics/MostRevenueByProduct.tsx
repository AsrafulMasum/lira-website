"use client";

import { BarChart2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Mock data
const productRevenueData = [
  { name: "Hermès Birkin", value: 4460, percentage: 100 },
  { name: "AP Royal Oak", value: 3780, percentage: 85 },
  { name: "Rolex Daytona", value: 3735, percentage: 84 },
  { name: "Modern Villa", value: 2615, percentage: 59 },
  { name: "Cartier Love Bracelet", value: 1268, percentage: 28 },
  { name: "Diamond Studs", value: 890, percentage: 20 },
];

export default function MostRevenueByProduct() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Most Revenue by Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {productRevenueData.map((product, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-right font-semibold text-green-900">
                  ${product.value.toLocaleString()}
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-900 rounded-full transition-all"
                  style={{ width: `${product.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
