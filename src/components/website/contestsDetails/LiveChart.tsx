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

const chartData = [
  { date: "2024-09-15", value: 28000 },
  { date: "2024-09-16", value: 32000 },
  { date: "2024-09-17", value: 29000 },
  { date: "2024-09-18", value: 35000 },
  { date: "2024-09-19", value: 42000 },
  { date: "2024-09-20", value: 48000 },
  { date: "2024-09-21", value: 55000 },
  { date: "2024-09-22", value: 62000 },
  { date: "2024-09-23", value: 58000 },
  { date: "2024-09-24", value: 65000 },
  { date: "2024-09-25", value: 72000 },
  { date: "2024-09-26", value: 78000 },
  { date: "2024-09-27", value: 85000 },
  { date: "2024-09-28", value: 92000 },
  { date: "2024-09-29", value: 88000 },
  { date: "2024-09-30", value: 95000 },
  { date: "2024-10-01", value: 102000 },
  { date: "2024-10-02", value: 108000 },
  { date: "2024-10-03", value: 115000 },
  { date: "2024-10-04", value: 122000 },
  { date: "2024-10-05", value: 118000 },
  { date: "2024-10-06", value: 125000 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#007A39",
  },
} satisfies ChartConfig;

export function LiveChart() {
  const [timeRange, setTimeRange] = React.useState("1W");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-10-06");
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
    return date >= startDate;
  });

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
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
              domain={[0, 150000]}
              ticks={[0, 30000, 60000, 90000, 120000, 150000]}
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
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  formatter={(value) => [
                    `${Math.round(Number(value) / 1000)}k`,
                    "Value",
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
