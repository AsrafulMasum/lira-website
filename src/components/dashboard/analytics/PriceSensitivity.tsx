"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

// Mock data
const priceSensitivityData = [
  { range: "$1-2", sellRate: "4,120", amplifier: "2.5", revenue: "$5,150" },
  { range: "$3-5", sellRate: "3,200", amplifier: "1.6", revenue: "$11,520" },
  { range: "$6-10", sellRate: "1,800", amplifier: "1.2", revenue: "$13,320" },
  { range: "$11+", sellRate: "980", amplifier: "0.8", revenue: "$15,435" },
];

export default function PriceSensitivity() {
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
              {priceSensitivityData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="py-3 px-4 text-sm font-medium">{row.range}</td>
                  <td className="py-3 px-4 text-sm">{row.sellRate}</td>
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
