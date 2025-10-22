"use client";

import { BarChart2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TopProductByRevenue = {
  product: string;
  revenue: number;
};

export default function MostRevenueByProduct({
  topProductsByRevenue,
}: {
  topProductsByRevenue: TopProductByRevenue[];
}) {
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
          {topProductsByRevenue
            ?.slice(0, 5)
            ?.map(
              (
                product: { product: string; revenue: number },
                index: number
              ) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{product.product}</div>
                    <div className="text-right font-semibold text-green-900">
                      ${product.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-900 rounded-full transition-all"
                      style={{ width: `${product.revenue}%` }}
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </CardContent>
    </Card>
  );
}
