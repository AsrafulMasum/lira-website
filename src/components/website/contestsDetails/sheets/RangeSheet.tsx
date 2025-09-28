"use client"

import type React from "react"

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import RangeBarChart from "@/components/shared/RangeBarChart"

// Sample data for the chart
const chartData = [
  { value: 3, amount: 118000, height: 60 },
  { value: 4, amount: 119000, height: 80 },
  { value: 6, amount: 120000, height: 100 },
  { value: 8, amount: 121000, height: 70 },
  { value: 4, amount: 122000, height: 50 },
  { value: 3, amount: 124000, height: 40 },
]

const RangeSheet = () => {
  const [rangeStart, setRangeStart] = useState(118000)
  const [rangeEnd, setRangeEnd] = useState(120500)

  const minValue = 118000
  const maxValue = 124000

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
    }
    return `$${value}`
  }

  const formatInputValue = (value: number) => {
    return value.toLocaleString()
  }

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "")
    const numericValue = Number(cleanValue)

    if (!isNaN(numericValue) && numericValue >= minValue) {
      const clampedValue = Math.min(numericValue, rangeEnd - 1000)
      setRangeStart(clampedValue)
    }
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "")
    const numericValue = Number(cleanValue)

    if (!isNaN(numericValue) && numericValue <= maxValue) {
      const clampedValue = Math.max(numericValue, rangeStart + 1000)
      setRangeEnd(clampedValue)
    }
  }

  const handleClear = () => {
    setRangeStart(minValue)
    setRangeEnd(maxValue)
  }

  const takenValues = chartData
    .filter((item) => item.amount >= rangeStart && item.amount <= rangeEnd)
    .map((item) => formatCurrency(item.amount))

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-16">
        <SheetTitle className="text-xl font-semibold text-[#002913]">Choose a range</SheetTitle>
      </SheetHeader>

      <div className="space-y-6 h-full flex flex-col justify-between">
        <div>
          <div className="space-y-4">
            <RangeBarChart
              data={chartData}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onRangeChange={(start, end) => {
                setRangeStart(start)
                setRangeEnd(end)
              }}
              minValue={minValue}
              maxValue={maxValue}
              formatValue={formatCurrency}
            />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm text-muted-foreground">
                From
              </Label>
              <Input
                id="from"
                type="text"
                value={formatInputValue(rangeStart)}
                onChange={handleFromChange}
                className="bg-muted h-14"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm text-muted-foreground">
                To
              </Label>
              <Input
                id="to"
                type="text"
                value={formatInputValue(rangeEnd)}
                onChange={handleToChange}
                className="bg-muted h-14"
              />
            </div>
          </div>

          {/* Information Text */}
          <div className="text-center text-sm font-medium text-muted-foreground">
            These numbers are taken: {takenValues.join(", ")}
            <br />
            you will receive the rest
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <Button
            onClick={handleClear}
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            Clear
          </Button>
          <Button
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            View list
          </Button>
          <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer flex-1">
            Select
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}

export default RangeSheet
