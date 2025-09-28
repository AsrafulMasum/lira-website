import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Clock, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

type Contest = {
  id: string | number;
  title: string;
  image: string;
  prize: string;
  prizePool: string;
  entries: number | string;
  timeLeft: string;
};

type Stat = {
  value: string | number;
  label: string;
  value2?: string | number;
  label2?: string;
};

interface AllPastContestsProps {
  statsData: Stat[];
  contestDataForViewAll: Contest[];
}

const AllPastContests = ({
  statsData,
  contestDataForViewAll,
}: AllPastContestsProps) => {
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
          Past contests
        </span>
      </div>

      <div className="py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 bg-bg border-0 shadow-none rounded-xl ${
                index === 2 && "col-span-2 lg:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="flex-1">
                    <div className={`text-2xl font-semibold text-primary mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-text flex items-center gap-1">
                      {stat.label}
                    </div>
                  </div>

                  {stat.value2 && stat.label2 && (
                    <div className="flex-1">
                      <div
                        className={`text-2xl font-semibold text-primary mb-1`}
                      >
                        {stat.value2}
                      </div>
                      <div className="text-sm font-semibold text-gray-text flex items-center gap-1">
                        {stat.label2}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 p-4 border border-border-color rounded-2xl">
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
          {contestDataForViewAll.map((contest) => (
            <Card
              key={contest.id}
              className="p-6 bg-white border-border-color shadow-none gap-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex lg:items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {contest?.title.split("on")[0] + "on"}{" "}
                    <span className="text-primary">
                      {contest?.title.split("on")[1]}
                    </span>{" "}
                  </h3>
                  <div className="cursor-pointer">
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
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  Ends in {contest.timeLeft}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={contest.image}
                    alt={contest.title}
                    width={50}
                    height={50}
                    className="w-16 h-16 rounded-lg border border-border-color object-cover"
                  />
                  <div>
                    <div className="text-dark-primary text-sm font-semibold mb-1">
                      {contest.prize}
                    </div>
                    <div className="text-primary text-sm font-semibold">
                      {contest.prizePool}{" "}
                      <span className="text-gray-text font-normal">
                        Prize pool
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-dark-primary border-border-color bg-bg`}
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
                    {contest.entries} Entries
                  </button>

                  {/* <button
                      className={`px-4 flex justify-center items-center gap-2 font-bold cursor-pointer h-12 border rounded-2xl transition text-dark-primary border-border-color bg-bg`}
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
                    </button> */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPastContests;
