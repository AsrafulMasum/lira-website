"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Award } from "lucide-react";

// Mock data
const newUsersData = [
  { name: "Evelyn Martinez", entries: "3", spend: "$45" },
  { name: "Ryan Johnson", entries: "2", spend: "$30" },
  { name: "Emily Davis", entries: "4", spend: "$60" },
  { name: "Carlos Wilson", entries: "1", spend: "$15" },
  { name: "Amanda Brown", entries: "5", spend: "$75" },
];

const highActivityData = [
  { name: "Sarah Johnson", thisWeek: "11", winRate: "92%" },
  { name: "Michael Chen", thisWeek: "9", winRate: "87%" },
  { name: "Emma Rodriguez", thisWeek: "8", winRate: "88%" },
  { name: "Lisa Thompson", thisWeek: "8", winRate: "85%" },
  { name: "James Wilson", thisWeek: "9", winRate: "92%" },
];

export default function UserActivity() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            New Users This Week
            <span className="text-xs text-gray-600 font-normal ml-1">
              (First entry this week)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    User
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    Entries
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    Spend
                  </th>
                </tr>
              </thead>
              <tbody>
                {newUsersData.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3 px-2 text-sm">{user.name}</td>
                    <td className="py-3 px-2 text-sm">{user.entries}</td>
                    <td className="py-3 px-2 text-sm font-semibold">
                      {user.spend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" />
            High Activity Users
            <span className="text-xs text-gray-600 font-normal ml-1">
              (Most entries this week)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    User
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    This Week
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium">
                    Win Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {highActivityData.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3 px-2 text-sm">{user.name}</td>
                    <td className="py-3 px-2 text-sm">{user.thisWeek}</td>
                    <td className="py-3 px-2 text-sm font-semibold">
                      {user.winRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}