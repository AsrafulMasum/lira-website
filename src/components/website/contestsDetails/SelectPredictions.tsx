"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SelectedValueSheet from "./sheets/SelectedValueSheet";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/helpers/apiRequest";
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
import { toast } from "sonner";

interface SelectableItem {
  _id: string;
  price: string;
  value: number;
  isAvailable: boolean;
}

interface TierItem {
  name: string;
  min: number;
  max: number;
  pricePerPrediction: number;
  isActive: boolean;
  _id: string;
}

interface Tier {
  tiers: TierItem[];
}

export function SelectPredictions({
  tiers,
  contestId,
  customValue,
}: {
  tiers?: Tier;
  contestId?: string;
  customValue?: string | undefined;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tiersArr = tiers?.tiers || [];

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const activeRange = searchParams.get("range") || tiers?.tiers[0]._id;
  const activeTier = tiersArr?.find((tier) => tier._id === activeRange);

  const [apiResult, setApiResult] = useState<any>(null);

  // Fetch data on mount or when contestId/activeRange changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest(
          `/contest/contest/prediction/${contestId}/tiers/${activeRange}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        setApiResult(response.data);
      } catch (error) {
        console.error("Failed to fetch prediction data:", error);
      }
    };

    if (contestId && activeRange) {
      fetchData();
    }
  }, [contestId, activeRange]);

  const toggleItem = (item: { _id: string; price: string; value: number }) => {
    const newSelected = new Set(selectedItems);
    const key = JSON.stringify({
      _id: item._id,
      price: Number(item.price),
      value: item.value,
    });

    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }

    setSelectedItems(newSelected);
  };

  const totalPrice = Array.from(selectedItems).reduce((sum, str) => {
    const { price } = JSON.parse(str);
    return sum + price;
  }, 0);

  const takenPercentage = Math.round(
    (selectedItems.size / apiResult?.length) * 100
  );

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", id);
    router.push(`?${params.toString()}`);
  };

  const handlePayment = async () => {
    const ids = Array.from(selectedItems).map((item) => {
      const parsed = JSON.parse(item);
      return { id: parsed._id };
    });

    const customPredictions =
      customValue && customValue.length > 0
        ? customValue.split(",").map((v) => ({ value: Number(v) }))
        : [];

    const payload = {
      contestId,
      generatedPredictionsIds: ids,
      customPredictions,
    };

    const res = await apiRequest("/orders/create-and-checkout", {
      method: "POST",
      body: payload,
    });

    console.log(res);

    if (res?.success) {
      globalThis.location.href = res?.data?.url;
    } else {
      toast.error(res?.message || "Failed to initiate payment.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <Card className="w-full min-w-3xl max-w-4xl mx-auto pt-6 pb-0 border border-border-color shadow-none rounded-3xl gap-0">
          {/* Price Range Tabs */}
          <div className="flex gap-1 px-6 border-b">
            {tiersArr?.map((range: { _id: string; name: string }) => (
              <button
                key={range?._id}
                onClick={() => handleClick(range?._id)}
                className={cn(
                  "mx-4 py-2 text-base font-semibold border-b-2 transition-colors cursor-pointer",
                  activeRange === range?._id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {range.name}
              </button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="flex gap-4 bg-bg px-6 pt-3 pb-5">
            <Badge
              variant="secondary"
              className="bg-border-color h-8 px-3 text-sm text-gray rounded-xl"
            >
              <span className="text-primary text-base">
                {" "}
                ${activeTier?.pricePerPrediction ?? 0}
              </span>{" "}
              Each
            </Badge>
            <Badge
              variant="secondary"
              className="bg-border-color h-8 px-3 text-sm text-gray rounded-xl"
            >
              {takenPercentage}% Taken
            </Badge>
            <Badge
              variant="secondary"
              className="bg-border-color h-8 px-3 text-sm text-gray rounded-xl"
            >
              {apiResult?.length} Entries
            </Badge>
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-5 gap-3 px-6 pb-3 bg-bg">
            {apiResult?.map((item: SelectableItem) => {
              const isSelected: boolean = Array.from(selectedItems).some(
                (str) => {
                  const parsed = JSON.parse(str);
                  return parsed._id === item._id;
                }
              );

              const isAvailable: boolean = item?.isAvailable;

              return (
                <button
                  key={item._id}
                  onClick={() => isAvailable && toggleItem(item)}
                  disabled={!isAvailable}
                  className={cn(
                    "relative h-12 transition-all duration-200 font-medium text-sm flex items-center justify-center cursor-pointer",
                    isSelected && isAvailable
                      ? "bg-primary text-white rounded-2xl px-4 gap-2"
                      : isAvailable
                      ? "bg-white text-primary rounded-2xl border border-gray-200 hover:border-gray-300"
                      : "bg-gray-50 text-gray-400 rounded-2xl border border-gray-200 cursor-not-allowed"
                  )}
                >
                  {!isSelected && isAvailable && (
                    <div className="absolute left-4 w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}

                  {!isSelected && !isAvailable && (
                    <div className="absolute left-4 w-5 h-5 bg-border-color rounded-full" />
                  )}

                  {isSelected && isAvailable && (
                    <div className="absolute left-4 w-5 h-5 bg-white rounded-full flex justify-center items-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <span>{item?.value?.toLocaleString()}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="hidden lg:flex items-center justify-between p-6 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-2xl font-semibold text-dark-primary">
                {selectedItems.size}
              </span>
              <span>Selected</span>

              <Sheet>
                <SheetTrigger asChild>
                  <button className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M9 3.5C5.25 3.5 2.0475 5.8325 0.75 9.125C2.0475 12.4175 5.25 14.75 9 14.75C12.75 14.75 15.9525 12.4175 17.25 9.125C15.9525 5.8325 12.75 3.5 9 3.5ZM9 12.875C6.93 12.875 5.25 11.195 5.25 9.125C5.25 7.055 6.93 5.375 9 5.375C11.07 5.375 12.75 7.055 12.75 9.125C12.75 11.195 11.07 12.875 9 12.875ZM9 6.875C7.755 6.875 6.75 7.88 6.75 9.125C6.75 10.37 7.755 11.375 9 11.375C10.245 11.375 11.25 10.37 11.25 9.125C11.25 7.88 10.245 6.875 9 6.875Z"
                        fill="#717A75"
                      />
                    </svg>
                  </button>
                </SheetTrigger>
                <SelectedValueSheet
                  selectedItems={Array.from(selectedItems).map((item) =>
                    JSON.parse(item)
                  )}
                  customValue={customValue}
                />
              </Sheet>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-primary">
                {"$" + totalPrice}
              </span>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer">
                    Continue
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
                      onClick={handlePayment}
                      type="submit"
                      className="bg-dark-primary px-4 hover:bg-dark-primary/90 text-primary-foreground cursor-pointer"
                    >
                      Confirm Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex lg:hidden items-center justify-between p-6 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-2xl font-semibold text-dark-primary">
            {selectedItems.size}
          </span>
          <span>Selected</span>

          <Sheet>
            <SheetTrigger asChild>
              <button className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <path
                    d="M9 3.5C5.25 3.5 2.0475 5.8325 0.75 9.125C2.0475 12.4175 5.25 14.75 9 14.75C12.75 14.75 15.9525 12.4175 17.25 9.125C15.9525 5.8325 12.75 3.5 9 3.5ZM9 12.875C6.93 12.875 5.25 11.195 5.25 9.125C5.25 7.055 6.93 5.375 9 5.375C11.07 5.375 12.75 7.055 12.75 9.125C12.75 11.195 11.07 12.875 9 12.875ZM9 6.875C7.755 6.875 6.75 7.88 6.75 9.125C6.75 10.37 7.755 11.375 9 11.375C10.245 11.375 11.25 10.37 11.25 9.125C11.25 7.88 10.245 6.875 9 6.875Z"
                    fill="#717A75"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SelectedValueSheet
              selectedItems={Array.from(selectedItems).map((item) =>
                JSON.parse(item)
              )}
              customValue={customValue}
            />
          </Sheet>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary">
            {"$" + totalPrice}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-dark-primary h-12 px-4 text-base font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-2xl cursor-pointer">
                Continue
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
                  onClick={handlePayment}
                  type="submit"
                  className="bg-dark-primary px-4 hover:bg-dark-primary/90 text-primary-foreground cursor-pointer"
                >
                  Confirm Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
