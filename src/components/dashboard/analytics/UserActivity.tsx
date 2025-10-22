"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Award } from "lucide-react";

type UserActivity = {
  newUsersThisWeek: {
    name: string;
    entries: string;
    spend: string;
  }[];
  highActivityUsers: {
    user: string;
    thisWeek: string;
    winRate: string;
  }[];
};

export default function UserActivity({
  userActivity,
}: {
  userActivity: UserActivity;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl font-bold">
              <UserPlus className="h-4 w-4" />
              New Users This Week
            </div>
            <span className="text-xs text-gray-600 font-normal ml-1">
              First entry this week
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
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
                {userActivity?.newUsersThisWeek?.map((user, index) => (
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
          <CardTitle className="text-base flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Award className="h-4 w-4" />
              High Activity Users
            </div>
            <span className="text-xs text-gray-600 font-normal ml-1">
              Most entries this week
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
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
                {userActivity?.highActivityUsers?.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3 px-2 text-sm">{user.user}</td>
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
