"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

type EntryPriceSensitivity = {
  priceRange: string;
  totalSellRate: number;
  amplifier: number;
  revenue: string;
};

export default function PriceSensitivity({
  entryPriceSensitivity,
}: {
  entryPriceSensitivity: EntryPriceSensitivity[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Entry Price Sensitivity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium">
                  Price Range
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium">
                  Total Sell Rate
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium">
                  Amplifier
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {entryPriceSensitivity?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-3 px-4 text-sm font-medium">
                    {row.priceRange}
                  </td>
                  <td className="py-3 px-4 text-sm">{row.totalSellRate}</td>
                  <td className="py-3 px-4 text-sm">{row.amplifier}</td>
                  <td className="py-3 px-4 text-sm font-semibold">
                    {row.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
