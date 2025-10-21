import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, User } from "lucide-react";

// Mock data
const topSpendersData = [
  { user: "Sarah Johnson", spend: 2450, wins: 12 },
  { user: "Michael Chen", spend: 1890, wins: 8 },
  { user: "Emma Rodriguez", spend: 1650, wins: 15 },
  { user: "David Kim", spend: 1420, wins: 6 },
  { user: "Lisa Thompson", spend: 1380, wins: 9 },
];

const goldStreakData = [
  { user: "Emma Rodriguez", streak: 7, wins: 15 },
  { user: "Sarah Johnson", streak: 5, wins: 12 },
  { user: "Maria Garcia", streak: 4, wins: 11 },
  { user: "Lisa Thompson", streak: 3, wins: 9 },
  { user: "Jennifer Davis", streak: 3, wins: 8 },
];

const coldStreakData = [
  { user: "Alex Thompson", streak: 12, spend: 890 },
  { user: "Rachel Kim", streak: 8, spend: 640 },
  { user: "Mark Rodriguez", streak: 7, spend: 1250 },
  { user: "Jessica Chen", streak: 6, spend: 720 },
  { user: "David Park", streak: 5, spend: 980 },
];

interface LoyaltyAndStreakProps {
  filters: any;
}

const LoyaltyAndStreak: React.FC<LoyaltyAndStreakProps> = (
  {
    // filters,
  }
) => {
  // In a real app, you would filter this data based on the filters prop

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
              <div className="text-4xl font-bold">4.2%</div>
              <div className="text-sm text-muted-foreground">Win rate</div>
            </div>
            <div className="ml-auto flex items-center text-sm font-medium text-green-600">
              +0.3% <span className="ml-1">↑</span>
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
                {topSpendersData.map((item, index) => (
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
                {goldStreakData.map((item, index) => (
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
                {coldStreakData.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.user}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
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
