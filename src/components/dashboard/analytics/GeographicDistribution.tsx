import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, BarChart3 } from "lucide-react";

// Mock data
const regionDistributionData = [
  { region: "California", users: 456, revenue: 34200, avgUser: 75 },
  { region: "New York", users: 389, revenue: 28900, avgUser: 74 },
  { region: "Texas", users: 312, revenue: 22100, avgUser: 71 },
  { region: "Florida", users: 278, revenue: 19800, avgUser: 71 },
  { region: "Illinois", users: 234, revenue: 17600, avgUser: 75 },
  { region: "Washington", users: 198, revenue: 15200, avgUser: 77 },
  { region: "Massachusetts", users: 167, revenue: 13400, avgUser: 80 },
  { region: "Georgia", users: 145, revenue: 11800, avgUser: 81 },
];

interface GeographicDistributionProps {
  filters: any;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = (
  {
    // filters,
  }
) => {
  // In a real app, you would filter this data based on the filters prop

  // Calculate max revenue for progress bars
  const maxRevenue = Math.max(
    ...regionDistributionData.map((item) => item.revenue)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-green-600" />
        <h2 className="text-2xl font-bold">Geographic Distribution</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border rounded-lg overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-white">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl font-bold">
                User Distribution by Region
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium">
                    Region
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium">
                    Users
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium">
                    Avg/User
                  </th>
                </tr>
              </thead>
              <tbody>
                {regionDistributionData.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.region}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.users}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-green-900">
                      ${item.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      ${item.avgUser}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border rounded-lg overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-white">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl font-bold">
                Top Revenue by Region
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-5">
            {regionDistributionData.slice(0, 6).map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{item.region}</div>
                  <div className="font-semibold text-green-900">
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-green-900"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographicDistribution;
