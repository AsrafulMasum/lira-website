"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const description = "An interactive area chart";

const chartConfig = {
  value: {
    label: "BTC Price (USD)",
    color: "#007A39",
  },
} satisfies ChartConfig;

export function LiveChart({ livePrice, category }: any) {
  const [timeRange, setTimeRange] = React.useState("1W");

  // ✅ Map livePrice.history → chartData
  const chartData = React.useMemo(() => {
    if (!livePrice?.history || !Array.isArray(livePrice.history)) return [];
    return livePrice.history.map((item: any) => ({
      date: item.timestamp,
      value: Number(item.value),
    }));
  }, [livePrice]);

  // ✅ Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    if (chartData.length === 0) return [];

    const referenceDate = new Date(chartData[chartData.length - 1].date);
    let daysToSubtract = 7;

    switch (timeRange) {
      case "24H":
        daysToSubtract = 1;
        break;
      case "1W":
        daysToSubtract = 7;
        break;
      case "1M":
        daysToSubtract = 30;
        break;
      case "1Y":
        daysToSubtract = 365;
        break;
      case "All":
        daysToSubtract = chartData.length;
        break;
      default:
        break;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item: any) => new Date(item.date) >= startDate);
  }, [chartData, timeRange]);

  return (
    <Card className="pt-0 bg-transparent shadow-none border-none">
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row p-0">
        <Tabs
          className="!w-full !bg-border-color rounded-full px-6 mx-0"
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <TabsList className="w-full gap-0 py-1">
            <TabsTrigger className="p-4 rounded-full border-b-0" value="24H">
              24H
            </TabsTrigger>
            <TabsTrigger className="p-4 rounded-full border-b-0" value="1W">
              1W
            </TabsTrigger>
            <TabsTrigger className="p-4 rounded-full border-b-0" value="1M">
              1M
            </TabsTrigger>
            <TabsTrigger className="p-4 rounded-full border-b-0" value="1Y">
              1Y
            </TabsTrigger>
            <TabsTrigger className="p-4 rounded-full border-b-0" value="All">
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="px-0 py-0 !w-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007A39" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#007A39" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={true}
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    `${" "} ${category} Price`,
                  ]}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="#007A39"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
