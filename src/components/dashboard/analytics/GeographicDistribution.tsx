import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, BarChart3 } from 'lucide-react';

// Mock data
const regionDistributionData = [
  { region: 'California', users: 456, revenue: 34200, avgUser: 75 },
  { region: 'New York', users: 389, revenue: 28900, avgUser: 74 },
  { region: 'Texas', users: 312, revenue: 22100, avgUser: 71 },
  { region: 'Florida', users: 278, revenue: 19800, avgUser: 71 },
  { region: 'Illinois', users: 234, revenue: 17600, avgUser: 75 },
  { region: 'Washington', users: 198, revenue: 15200, avgUser: 77 },
  { region: 'Massachusetts', users: 167, revenue: 13400, avgUser: 80 },
  { region: 'Georgia', users: 145, revenue: 11800, avgUser: 81 },
];

interface GeographicDistributionProps {
  filters: any;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ filters }) => {
  // In a real app, you would filter this data based on the filters prop
  
  // Calculate max revenue for progress bars
  const maxRevenue = Math.max(...regionDistributionData.map(item => item.revenue));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-green-600" />
        <h2 className="text-xl font-bold">Geographic Distribution</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm font-medium">
                User Distribution by Region
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-xs font-medium">
                <div>Region</div>
                <div className="text-right">Users</div>
                <div className="text-right">Revenue</div>
                <div className="text-right">Avg/User</div>
              </div>
              {regionDistributionData.map((item, index) => (
                <div key={index} className="grid grid-cols-4 text-sm">
                  <div className="font-medium text-blue-600">{item.region}</div>
                  <div className="text-right">{item.users}</div>
                  <div className="text-right">${item.revenue.toLocaleString()}</div>
                  <div className="text-right">${item.avgUser}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm font-medium">
                Top Revenue by Region
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionDistributionData.slice(0, 8).map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.region}</div>
                    <div className="font-medium">${item.revenue.toLocaleString()}</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div 
                      className="h-2 rounded-full bg-green-600" 
                      style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographicDistribution;