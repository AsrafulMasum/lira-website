"use client";

import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FinancialPerformance() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Financial Performance</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-green-500" />
              <span className="text-sm text-green-500">+24.5% ↑</span>
            </div>
            <div className="text-3xl font-bold">
              ${(127450).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <span className="text-sm text-green-500">+8.3% ↑</span>
            </div>
            <div className="text-3xl font-bold">${(59.12).toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">
              Avg Revenue per User
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="h-8 w-8 text-purple-500" />
              <span className="text-sm text-green-500">+4.2% ↑</span>
            </div>
            <div className="text-3xl font-bold">${(47.85).toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}