"use client";

import type React from "react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter, useSearchParams } from "next/navigation";
import RangeBarChart from "@/components/shared/RangeBarChart";
import { apiRequest } from "@/helpers/apiRequest";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Prediction {
  _id: string;
  value: number;
  isAvailable: boolean;
  price: number;
}

function generateChartData(minAmount: number, maxAmount: number) {
  const fixedHeights = [60, 80, 100, 70, 50];
  const numberOfPoints = 5;
  const step = (maxAmount - minAmount) / (numberOfPoints - 1);

  const data = [];

  for (let i = 0; i < numberOfPoints; i++) {
    const amount = Math.round(minAmount + step * i);
    const value = Math.floor(Math.random() * 6) + 1;
    const height = fixedHeights[i];

    data.push({ value, amount, height });
  }

  return data;
}

const RangeSheet = ({
  minValue,
  maxValue,
  predictions,
  contestId,
}: {
  minValue: number;
  maxValue: number;
  predictions: Prediction[];
  contestId: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chartData = generateChartData(minValue, maxValue);

  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const paramStart = searchParams.get("rangeStart");
    const paramEnd = searchParams.get("rangeEnd");

    if (paramStart && paramEnd) {
      setRangeStart(Number(paramStart));
      setRangeEnd(Number(paramEnd));
    } else {
      setRangeStart(minValue);
      setRangeEnd(maxValue);
    }
    setIsLoaded(true);
  }, [minValue, maxValue, searchParams]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }
    return `$${value}`;
  };

  const formatInputValue = (value: number | null) => {
    if (value === null || value === undefined) return "";
    return value.toLocaleString();
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue >= minValue) {
      const clampedValue = Math.min(
        numericValue,
        rangeEnd ? rangeEnd - 1000 : maxValue
      );
      setRangeStart(clampedValue);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(cleanValue);

    if (!isNaN(numericValue) && numericValue <= maxValue) {
      const clampedValue = Math.max(
        numericValue,
        rangeStart ? rangeStart + 1000 : minValue
      );
      setRangeEnd(clampedValue);
    }
  };

  const handleClear = () => {
    setRangeStart(minValue);
    setRangeEnd(maxValue);
  };

  // const handleSelect = async () => {
  //   const start = rangeStart ?? minValue;
  //   const end = rangeEnd ?? maxValue;

  //   const ids = predictions
  //     .filter(
  //       (item) =>
  //         item.isAvailable === true && item.value >= start && item.value <= end
  //     )
  //     .map((item) => ({ id: item._id }));
  //   const payload = {
  //     contestId,
  //     generatedPredictionsIds: ids,
  //   };
  //   console.log(payload);

  //   const res = await apiRequest("/orders/create-and-checkout", {
  //     method: "POST",
  //     body: payload,
  //   });

  //   if (res?.success) {
  //     globalThis.location.href = res?.data?.url;
  //   } else {
  //     toast.error(res?.message || "Failed to initiate payment.");
  //   }
  // };

  const handleSelect = async () => {
    const payload = {
      contestId,
    };

    const res = await apiRequest("/wait-list/create", {
      method: "POST",
      body: payload,
    });

    if (res?.success) {
      toast.success("You have been added to the WaitList.");
      router.push("/profile");
    }
  };

  const takenValues = predictions
    .filter(
      (item) =>
        item.isAvailable === false &&
        item.value >= (rangeStart ?? minValue) &&
        item.value <= (rangeEnd ?? maxValue)
    )
    .map((item) => item.value);

  if (!isLoaded) {
    return null;
  }

  return (
    <SheetContent
      className="w-full h-[75%] lg:h-full sm:max-w-md px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl pt-10 bg-[#FAFFFC] overflow-y-auto scrollbar-hide"
      side={isMobile ? "bottom" : "right"}
    >
      <SheetHeader className="space-y-0 p-0 pb-16">
        <SheetTitle className="text-xl font-semibold text-[#002913]">
          Choose a range
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6 h-full flex flex-col justify-between">
        <div>
          <div className="space-y-4">
            <RangeBarChart
              data={chartData}
              rangeStart={rangeStart ?? minValue}
              rangeEnd={rangeEnd ?? maxValue}
              onRangeChange={(start, end) => {
                setRangeStart(start);
                setRangeEnd(end);
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
          {takenValues?.length !== 0 && (
            <div className="text-center text-sm font-medium text-muted-foreground">
              These numbers are taken: {takenValues.join(", ")}
              <br />
              you will receive the rest
            </div>
          )}
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
          {/* <Button
            variant="outline"
            className="bg-bg h-12 px-4 text-base font-bold text-primary rounded-2xl cursor-pointer flex-1"
          >
            View list
          </Button> */}
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer flex-1">
                Select
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogDescription className="my-5">
                  Please confirm that you want to proceed with this payment.
                  Once completed, this action cannot be reversed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleSelect}
                  type="submit"
                  className="bg-dark-primary px-4 hover:bg-dark-primary/90 text-primary-foreground cursor-pointer"
                >
                  Confirm Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer flex-1">
                Select
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Be in waitlist</DialogTitle>
                <DialogDescription className="my-5">
                  Please confirm that you want to join the waitlist. Once
                  completed, this action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={handleSelect}
                    type="submit"
                    className="bg-dark-primary px-4 hover:bg-dark-primary/90 text-primary-foreground cursor-pointer"
                  >
                    Confirm
                  </Button>
                </DialogClose>
                {/* <Button
                      onClick={handlePayment}
                      type="submit"
                      className="bg-dark-primary px-4 hover:bg-dark-primary/90 text-primary-foreground cursor-pointer"
                    >
                      Confirm
                    </Button> */}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SheetContent>
  );
};

export default RangeSheet;
