import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

// Mock data
const topSpendersData = [
  { user: 'Sarah Johnson', spend: 2450, wins: 12 },
  { user: 'Michael Chen', spend: 1890, wins: 8 },
  { user: 'Emma Rodriguez', spend: 1650, wins: 15 },
  { user: 'David Kim', spend: 1420, wins: 6 },
  { user: 'Lisa Thompson', spend: 1380, wins: 9 },
];

const goldStreakData = [
  { user: 'Emma Rodriguez', streak: 7, wins: 15 },
  { user: 'Sarah Johnson', streak: 5, wins: 12 },
  { user: 'Maria Garcia', streak: 4, wins: 11 },
  { user: 'Lisa Thompson', streak: 3, wins: 9 },
  { user: 'Jennifer Davis', streak: 3, wins: 8 },
];

const coldStreakData = [
  { user: 'Alex Thompson', streak: 12, spend: 890 },
  { user: 'Rachel Kim', streak: 8, spend: 540 },
  { user: 'Mark Rodriguez', streak: 7, spend: 1250 },
  { user: 'Jessica Chen', streak: 6, spend: 720 },
  { user: 'David Park', streak: 5, spend: 980 },
];

interface LoyaltyAndStreakProps {
  filters: any;
}

const LoyaltyAndStreak: React.FC<LoyaltyAndStreakProps> = ({ filters }) => {
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Top Users by Spend
            </CardTitle>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-xs font-medium">
                <div>User</div>
                <div className="text-right">Spend</div>
                <div className="text-right">Wins</div>
              </div>
              {topSpendersData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 text-sm">
                  <div className="font-medium text-blue-600">{item.user}</div>
                  <div className="text-right">${item.spend}</div>
                  <div className="text-right">{item.wins}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <CardTitle className="text-sm font-medium">
                Gold Streak Leaders
              </CardTitle>
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-xs text-muted-foreground">Current winning streaks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-xs font-medium">
                <div>User</div>
                <div className="text-right">Streak</div>
                <div className="text-right">Wins</div>
              </div>
              {goldStreakData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 text-sm">
                  <div className="font-medium text-blue-600">{item.user}</div>
                  <div className="text-right flex justify-end items-center">
                    <span className="text-amber-500 mr-1">★</span> {item.streak}
                  </div>
                  <div className="text-right">{item.wins}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <CardTitle className="text-sm font-medium">
                Cold Streak Users
              </CardTitle>
              <span className="text-blue-500">❄</span>
            </div>
            <p className="text-xs text-muted-foreground">Users to reward or engage</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-xs font-medium">
                <div>User</div>
                <div className="text-right">Streak</div>
                <div className="text-right">Spend</div>
              </div>
              {coldStreakData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 text-sm">
                  <div className="font-medium text-blue-600">{item.user}</div>
                  <div className="text-right flex justify-end items-center">
                    <span className="text-blue-500 mr-1">❄</span> {item.streak}
                  </div>
                  <div className="text-right">${item.spend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyAndStreak;