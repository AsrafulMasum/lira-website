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
import { ListFilter, Search } from "lucide-react";
import React, { useState } from "react";

const CryptoContent = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "bitcoin" | "ethereum" | "marketCapRanges"
  >("all");
  return (
    <section className="bg-bg min-h-screen py-10">
      <ContainerLayout>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r pr-6">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 rounded-2xl bg-[#FAFFFC] border border-[#E6EBE8]"
              />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-2 bg-[#FAFFFC] w-12 h-12 text-sm font-medium text-primary rounded-2xl border border-[#E6EBE8]">
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

          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 font-bold cursor-pointer h-12 border rounded-2xl transition ${
                activeTab === "all"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("bitcoin")}
              className={`px-4 font-bold cursor-pointer h-12 border rounded-2xl transition ${
                activeTab === "bitcoin"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Bitcoin
            </button>
            <button
              onClick={() => setActiveTab("ethereum")}
              className={`px-4 font-bold cursor-pointer h-12 border rounded-2xl transition ${
                activeTab === "ethereum"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Ethereum
            </button>
            <button
              onClick={() => setActiveTab("marketCapRanges")}
              className={`px-4 font-bold cursor-pointer h-12 border rounded-2xl transition ${
                activeTab === "marketCapRanges"
                  ? "text-primary border-primary"
                  : "text-neutral-500"
              }`}
            >
              Market Cap Ranges
            </button>
          </div>
        </div>
        <div>
          {/* Tab Content */}
          {activeTab === "all" && <div className="p-4">All Events Content</div>}
          {activeTab === "bitcoin" && (
            <div className="p-4">Bitcoin Events Content</div>
          )}
          {activeTab === "ethereum" && (
            <div className="p-4">Ethereum Events Content</div>
          )}
          {activeTab === "marketCapRanges" && (
            <div className="p-4">Market Cap Ranges Content</div>
          )}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default CryptoContent;
