import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, RefreshCw, Target, Eye, Clock } from "lucide-react";

type UserEngagementAndGrowth = {
  activeUsers: {
    value: number;
    change: string;
  };
  repeatUsers: {
    value: number;
    change: string;
  };
  conversionRate: {
    value: number;
    change: string;
  };
  abandonmentRate: {
    value: number;
    change: string;
  };
  avgTimeToFirst: {
    value: number;
    change: string;
  };
};

const UserEngagement = ({
  userEngagementAndGrowth,
}: {
  userEngagementAndGrowth: UserEngagementAndGrowth;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">User Engagement & Growth</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="rounded-md bg-blue-50 p-2">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  {userEngagementAndGrowth?.activeUsers?.change}{" "}
                  <span className="ml-1 text-xs">ⓘ</span>
                </span>
              </div>
              <div className="text-3xl font-bold">
                {userEngagementAndGrowth?.activeUsers?.value}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="rounded-md bg-blue-50 p-2">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  {userEngagementAndGrowth?.repeatUsers?.change}{" "}
                  <span className="ml-1 text-xs">ⓘ</span>
                </span>
              </div>
              <div className="text-3xl font-bold">
                {userEngagementAndGrowth?.repeatUsers?.value}%
              </div>
              <div className="text-sm text-muted-foreground">Repeat Users</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="rounded-md bg-orange-50 p-2">
                  <Target className="h-4 w-4 text-orange-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  {userEngagementAndGrowth?.conversionRate?.change}{" "}
                  <span className="ml-1 text-xs">ⓘ</span>
                </span>
              </div>
              <div className="text-3xl font-bold">
                {userEngagementAndGrowth?.conversionRate?.value}%
              </div>
              <div className="text-sm text-muted-foreground">
                Conversion Rate
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="rounded-md bg-red-50 p-2">
                  <Eye className="h-4 w-4 text-red-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-red-600">
                  {userEngagementAndGrowth?.abandonmentRate?.change}{" "}
                  <span className="ml-1 text-xs">ⓘ</span>
                </span>
              </div>
              <div className="text-3xl font-bold">
                {userEngagementAndGrowth?.abandonmentRate?.value}%
              </div>
              <div className="text-sm text-muted-foreground">
                Abandonment Rate
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="rounded-md bg-teal-50 p-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-red-600">
                  {userEngagementAndGrowth?.avgTimeToFirst?.change}{" "}
                  <span className="ml-1 text-xs">ⓘ</span>
                </span>
              </div>
              <div className="text-3xl font-bold">
                {userEngagementAndGrowth?.avgTimeToFirst?.value} days
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Time to First
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserEngagement;
