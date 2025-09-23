"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ContainerLayout from "@/layout/ContainerLayout";
import { ListFilter, Search, X } from "lucide-react";
import React, { useState } from "react";
import Contests from "../filterTabsContent/Contests";

const CryptoContent = () => {
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "bitcoin" | "ethereum" | "marketCapRanges"
  >("all");
  return (
    <section className="bg-bg min-h-[calc(100vh-112px)] py-10">
      <ContainerLayout>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-auto flex items-center gap-4 lg:border-r lg:pr-6">
            <div className="relative w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="px-10 rounded-2xl bg-[#FAFFFC] border border-border-color"
              />
              {value && (
                <button
                  onClick={() => setValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C14.2075 14.3927 14.0976 14.4663 13.9766 14.5164C13.8557 14.5666 13.726 14.5924 13.595 14.5924C13.464 14.5924 13.3343 14.5666 13.2134 14.5164C13.0924 14.4663 12.9825 14.3927 12.89 14.3L10 11.41L7.11 14.3C6.92302 14.487 6.66943 14.592 6.405 14.592C6.14057 14.592 5.88698 14.487 5.7 14.3C5.51302 14.113 5.40798 13.8594 5.40798 13.595C5.40798 13.4641 5.43377 13.3344 5.48387 13.2135C5.53398 13.0925 5.60742 12.9826 5.7 12.89L8.59 10L5.7 7.11C5.51302 6.92302 5.40798 6.66943 5.40798 6.405C5.40798 6.14057 5.51302 5.88698 5.7 5.7C5.88698 5.51302 6.14057 5.40798 6.405 5.40798C6.66943 5.40798 6.92302 5.51302 7.11 5.7L10 8.59L12.89 5.7C12.9826 5.60742 13.0925 5.53398 13.2135 5.48387C13.3344 5.43377 13.4641 5.40798 13.595 5.40798C13.7259 5.40798 13.8556 5.43377 13.9765 5.48387C14.0975 5.53398 14.2074 5.60742 14.3 5.7C14.3926 5.79258 14.466 5.90249 14.5161 6.02346C14.5662 6.14442 14.592 6.27407 14.592 6.405C14.592 6.53593 14.5662 6.66558 14.5161 6.78654C14.466 6.90751 14.3926 7.01742 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z"
                      fill="#717A75"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-2 bg-[#FAFFFC] w-12 h-12 text-sm font-medium text-primary rounded-2xl border border-border-color">
                    <ListFilter className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap ${
                activeTab === "all"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("bitcoin")}
              className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap ${
                activeTab === "bitcoin"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Bitcoin
            </button>
            <button
              onClick={() => setActiveTab("ethereum")}
              className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap ${
                activeTab === "ethereum"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Ethereum
            </button>
            <button
              onClick={() => setActiveTab("marketCapRanges")}
              className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap ${
                activeTab === "marketCapRanges"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Market Cap Ranges
            </button>
          </div>
        </div>

        <div className="">
          {/* Tab Content */}
          {activeTab === "all" && <Contests type="all" />}
          {activeTab === "bitcoin" && <Contests type="bitcoin" />}
          {activeTab === "ethereum" && <Contests type="ethereum" />}
          {activeTab === "marketCapRanges" && (
            <Contests type="marketCapRanges" />
          )}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default CryptoContent;
