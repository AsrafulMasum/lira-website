"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Mock data
const productRevenueData = [
  { name: "Hermès Birkin", value: 4460, percentage: 100 },
  { name: "AP Royal Oak", value: 3780, percentage: 88 },
  { name: "Rolex Daytona", value: 3735, percentage: 84 },
  { name: "Modern Villa", value: 2615, percentage: 59 },
  { name: "Cartier Love Bracelet", value: 1268, percentage: 28 },
  { name: "Diamond Studs", value: 890, percentage: 20 },
];

export default function MostRevenueByProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Most Revenue by Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productRevenueData.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium mb-1">{product.name}</div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-800 rounded-full transition-all"
                    style={{ width: `${product.percentage}%` }}
                  />
                </div>
              </div>
              <div className="text-right font-semibold text-green-800 ml-4">
                ${product.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
