"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import Pagination from "@/components/shared/Pagination";
import moment from "moment";
import Link from "next/link";
import ContestCountdown from "@/hooks/ContestCountdown";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MyEntriesSheet from "./MyEntriesSheet";

interface Contest {
  _id: string | number;
  orderId: string;
  userId: string;
  contestId: any;
  contestName: string;
  predictions: any[];
}

interface AllOngoingContestsProps {
  contestData: Contest[];
  meta: any;
  ongoingAnalytics: any;
}

const AllOngoingContests = ({
  contestData,
  meta,
  ongoingAnalytics,
}: AllOngoingContestsProps) => {
  const statsDataForViewAll = [
    { value: ongoingAnalytics?.totalEntries, label: "Entries" },
    { value: ongoingAnalytics?.totalContests, label: "Contests" },
    {
      value: `$ ${ongoingAnalytics?.totalRevenue}`,
      label: "Potential earnings",
      hasInfo: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="py-4">
        <div className="flex items-center gap-0.5 text-sm text-gray-600">
          <span className="text-primary cursor-pointer hover:underline">
            Profile
          </span>
          <ChevronRight className="size-4 text-primary" />
        </div>

        <span className="text-dark-primary text-3xl font-semibold">
          Ongoing contests
        </span>
      </div>

      <div className="py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsDataForViewAll.map((stat, index) => (
            <Card
              key={index}
              className={`p-8 bg-bg border-0 shadow-none ${
                index === 2 && "col-span-2 lg:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-semibold text-primary`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-text font-semibold flex items-center gap-1 mt-1">
                    {stat.label}
                    {stat.hasInfo && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                      >
                        <path
                          d="M8.9625 14C9.225 14 9.447 13.9093 9.6285 13.7278C9.81 13.5463 9.9005 13.3245 9.9 13.0625C9.8995 12.8005 9.809 12.5785 9.6285 12.3965C9.448 12.2145 9.226 12.124 8.9625 12.125C8.699 12.126 8.47725 12.2168 8.29725 12.3973C8.11725 12.5778 8.0265 12.7995 8.025 13.0625C8.0235 13.3255 8.11425 13.5475 8.29725 13.7285C8.48025 13.9095 8.702 14 8.9625 14ZM8.2875 11.1125H9.675C9.675 10.7 9.722 10.375 9.816 10.1375C9.91 9.9 10.1755 9.575 10.6125 9.1625C10.9375 8.8375 11.1938 8.528 11.3813 8.234C11.5688 7.94 11.6625 7.587 11.6625 7.175C11.6625 6.475 11.4062 5.9375 10.8938 5.5625C10.3813 5.1875 9.775 5 9.075 5C8.3625 5 7.7845 5.1875 7.341 5.5625C6.8975 5.9375 6.588 6.3875 6.4125 6.9125L7.65 7.4C7.7125 7.175 7.85325 6.93125 8.07225 6.66875C8.29125 6.40625 8.6255 6.275 9.075 6.275C9.475 6.275 9.775 6.3845 9.975 6.6035C10.175 6.8225 10.275 7.063 10.275 7.325C10.275 7.575 10.2 7.8095 10.05 8.0285C9.9 8.2475 9.7125 8.4505 9.4875 8.6375C8.9375 9.125 8.6 9.49375 8.475 9.74375C8.35 9.99375 8.2875 10.45 8.2875 11.1125ZM9 17C7.9625 17 6.9875 16.8033 6.075 16.4098C5.1625 16.0163 4.36875 15.4818 3.69375 14.8063C3.01875 14.1308 2.4845 13.337 2.091 12.425C1.6975 11.513 1.5005 10.538 1.5 9.5C1.4995 8.462 1.6965 7.487 2.091 6.575C2.4855 5.663 3.01975 4.86925 3.69375 4.19375C4.36775 3.51825 5.1615 2.984 6.075 2.591C6.9885 2.198 7.9635 2.001 9 2C10.0365 1.999 11.0115 2.196 11.925 2.591C12.8385 2.986 13.6323 3.52025 14.3063 4.19375C14.9803 4.86725 15.5148 5.661 15.9098 6.575C16.3048 7.489 16.5015 8.464 16.5 9.5C16.4985 10.536 16.3015 11.511 15.909 12.425C15.5165 13.339 14.9823 14.1328 14.3063 14.8063C13.6303 15.4798 12.8365 16.0143 11.925 16.4098C11.0135 16.8053 10.0385 17.002 9 17ZM9 15.5C10.675 15.5 12.0938 14.9188 13.2563 13.7563C14.4187 12.5938 15 11.175 15 9.5C15 7.825 14.4187 6.40625 13.2563 5.24375C12.0938 4.08125 10.675 3.5 9 3.5C7.325 3.5 5.90625 4.08125 4.74375 5.24375C3.58125 6.40625 3 7.825 3 9.5C3 11.175 3.58125 12.5938 4.74375 13.7563C5.90625 14.9188 7.325 15.5 9 15.5Z"
                          fill="#96A39C"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row  lg:items-center justify-between gap-4 mb-6 p-4 border border-border-color rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, category..."
              className="pl-10 h-10 bg-bg border-border-color"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-bg border-border-color cursor-pointer hover:bg-bg shadow-none text-dark-primary"
            >
              Date
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="bg-bg border-border-color cursor-pointer hover:bg-bg shadow-none text-dark-primary"
            >
              Categories
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Contest List */}
        <div className="space-y-4 mb-6">
          {contestData.map((contest) => (
            <Card
              key={contest._id}
              className="p-6 bg-white border-border-color shadow-none gap-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex lg:items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {contest?.contestName} on{" "}
                    <span className="text-primary">
                      {moment(contest?.contestId?.endTime).format(
                        "MMMM D [at] h:mm A"
                      )}
                    </span>{" "}
                  </h3>

                  <Link
                    href={`/contests/${contest?.contestId?._id}`}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M4.16667 18C3.70833 18 3.31611 17.8369 2.99 17.5108C2.66389 17.1847 2.50056 16.7922 2.5 16.3333V4.66667C2.5 4.20833 2.66333 3.81611 2.99 3.49C3.31667 3.16389 3.70889 3.00056 4.16667 3H10V4.66667H4.16667V16.3333H15.8333V10.5H17.5V16.3333C17.5 16.7917 17.3369 17.1842 17.0108 17.5108C16.6847 17.8375 16.2922 18.0006 15.8333 18H4.16667ZM8.08333 13.5833L6.91667 12.4167L14.6667 4.66667H11.6667V3H17.5V8.83333H15.8333V5.83333L8.08333 13.5833Z"
                        fill="#717A75"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="flex items-center gap-1 text-gray text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  Ends in{" "}
                  <ContestCountdown
                    endDate={contest?.contestId?.endTime}
                    isMarketPlace={true}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${contest?.contestId?.image}`}
                    alt={contest?.contestId?.image}
                    width={50}
                    height={50}
                    className="w-16 h-16 rounded-lg border border-border-color object-cover"
                  />
                  <div>
                    <div className="text-dark-primary text-sm font-semibold mb-1">
                      {contest?.contestId?.prize?.title}
                    </div>
                    <div className="text-primary text-sm font-semibold">
                      $ {contest?.contestId?.prize?.prizePool}{" "}
                      <span className="text-gray-text font-normal">
                        Prize pool
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className={`text-sm lg:text-base px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-dark-primary border-border-color bg-bg text-nowrap`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9 3C5.25 3 2.0475 5.3325 0.75 8.625C2.0475 11.9175 5.25 14.25 9 14.25C12.75 14.25 15.9525 11.9175 17.25 8.625C15.9525 5.3325 12.75 3 9 3ZM9 12.375C6.93 12.375 5.25 10.695 5.25 8.625C5.25 6.555 6.93 4.875 9 4.875C11.07 4.875 12.75 6.555 12.75 8.625C12.75 10.695 11.07 12.375 9 12.375ZM9 6.375C7.755 6.375 6.75 7.38 6.75 8.625C6.75 9.87 7.755 10.875 9 10.875C10.245 10.875 11.25 9.87 11.25 8.625C11.25 7.38 10.245 6.375 9 6.375Z"
                            fill="#004721"
                          />
                        </svg>
                        {contest?.predictions?.length} Entries
                      </button>
                    </SheetTrigger>
                    <MyEntriesSheet items={contest?.predictions} />
                  </Sheet>

                  <Link
                    href={`/contests/${contest?.contestId?._id}`}
                    className={`text-sm lg:text-base px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-dark-primary border-border-color bg-bg text-nowrap`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M5.16669 6.83336H1.00002C0.763912 6.83336 0.566134 6.75336 0.40669 6.59336C0.247246 6.43336 0.167245 6.23558 0.16669 6.00002C0.166134 5.76447 0.246134 5.56669 0.40669 5.40669C0.567246 5.24669 0.765023 5.16669 1.00002 5.16669H5.16669V1.00002C5.16669 0.763912 5.24669 0.566134 5.40669 0.40669C5.56669 0.247246 5.76447 0.167245 6.00002 0.16669C6.23558 0.166134 6.43363 0.246134 6.59419 0.40669C6.75475 0.567246 6.83447 0.765023 6.83336 1.00002V5.16669H11C11.2361 5.16669 11.4342 5.24669 11.5942 5.40669C11.7542 5.56669 11.8339 5.76447 11.8334 6.00002C11.8328 6.23558 11.7528 6.43363 11.5934 6.59419C11.4339 6.75475 11.2361 6.83447 11 6.83336H6.83336V11C6.83336 11.2361 6.75336 11.4342 6.59336 11.5942C6.43336 11.7542 6.23558 11.8339 6.00002 11.8334C5.76447 11.8328 5.56669 11.7528 5.40669 11.5934C5.24669 11.4339 5.16669 11.2361 5.16669 11V6.83336Z"
                        fill="#004721"
                      />
                    </svg>
                    Add entries
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination meta={meta} />
      </div>
    </div>
  );
};

export default AllOngoingContests;
