import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, User } from "lucide-react";

type LoyaltyMetrics = {
  loyaltyAndStreakBehavior: {
    winRate: string;
    change: string;
  };
  topUsersBySpend: {
    user: string;
    spend: string;
    wins: string;
  }[];
  goldStreakLeaders: {
    user: string;
    streak: number;
    wins: number;
  }[];
  coldStreakUsers: {
    user: string;
    streak: number;
    spend: number;
  }[];
};

const LoyaltyAndStreak = ({
  loyaltyMetrics,
}: {
  loyaltyMetrics: LoyaltyMetrics;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h2 className="text-xl font-bold">Loyalty & Streak Behavior</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-amber-50 p-3">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <div className="text-4xl font-bold">
                {loyaltyMetrics?.loyaltyAndStreakBehavior?.winRate}%
              </div>
              <div className="text-sm text-muted-foreground">Win rate</div>
            </div>
            <div className="ml-auto flex items-center text-sm font-medium text-green-600">
              {loyaltyMetrics?.loyaltyAndStreakBehavior?.change}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border rounded-lg overflow-hidden">
          <CardHeader className="py-3 px-4 border-b bg-white">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-700" />
              <CardTitle className="text-xl font-bold">
                Top Users by Spend
              </CardTitle>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-bold">
                    User
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold">
                    Spend
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold">
                    Wins
                  </th>
                </tr>
              </thead>
              <tbody>
                {loyaltyMetrics?.topUsersBySpend?.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.user}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-green-700">
                      ${item.spend}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.wins}
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
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-xl font-bold">
                Gold Streak Leaders
              </CardTitle>
              <span className="text-amber-500 text-lg">🏆</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current winning streaks
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-bold">
                    User
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-bold">
                    Streak
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold">
                    Wins
                  </th>
                </tr>
              </thead>
              <tbody>
                {loyaltyMetrics?.goldStreakLeaders?.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.user}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium text-amber-800">
                        {item.streak}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.wins}
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
              <span className="text-blue-500 text-lg">❄️</span>
              <CardTitle className="text-xl font-bold">
                Cold Streak Users
              </CardTitle>
              <span className="text-blue-500 text-lg">❄️</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Users to reward or re-engage
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-bold">
                    User
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-bold">
                    Streak
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold">
                    Spend
                  </th>
                </tr>
              </thead>
              <tbody>
                {loyaltyMetrics?.coldStreakUsers?.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.user}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                        {item.streak}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-green-700">
                      ${item.spend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyAndStreak;
