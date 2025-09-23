import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight, Clock, Eye, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const PastContests = ({ viewAll }: { viewAll?: boolean }) => {
  const contestData = [
    {
      id: 1,
      title: "Predict the BTC price on July 1 at 9:0...",
      status: "Ended 09/18/25",
      result: "No luck",
      value: "$104,652",
      views: 8,
      won: false,
    },
    {
      id: 2,
      title: "Predict the BTC price on July 1 at 9:0...",
      status: "Ended 09/18/25",
      result: "You won!",
      value: "$104,652",
      views: 8,
      won: true,
    },
    {
      id: 3,
      title: "Predict the BTC price on July 1 at 9:0...",
      status: "Ended 09/18/25",
      result: "No luck",
      value: "$104,652",
      views: 8,
      won: false,
    },
  ];

  const contestDataForViewAll = [
    {
      id: 1,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 2,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 3,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 4,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 5,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 6,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 7,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
    {
      id: 8,
      title: "Predict the BTC price on July 1 at 9:00 PM",
      prize: "Win a Rolex Daytona",
      prizePool: "$2,845.50",
      entries: 8,
      timeLeft: "2d 3h 20m",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.rf1_aUmpxrXLqyRdfs1b-AHaE7?pid=Api",
    },
  ];

  const statsData = [
    { value: "112", label: "Entries" },
    {
      value: "45",
      label: "Contests",
      value2: "12",
      label2: "Won",
    },
    {
      value: "$18,000",
      label: "Earnings",
    },
  ];

  if (viewAll) {
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
          <div className="grid grid-cols-3 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-bg border-0 shadow-none rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="w-full flex justify-between items-center gap-2">
                    <div className="flex-1">
                      <div
                        className={`text-2xl font-semibold text-primary mb-1`}
                      >
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
          <div className="flex items-center justify-between mb-6 p-4 border border-border-color rounded-2xl">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
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

                <div className="flex items-center justify-between">
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
  }

  return (
    <div className="w-full mx-auto bg-[#FAFFFC] rounded-xl border border-gray-100 p-5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-dark-primary">Past</h2>
        <Link
          href="/profile/past-contests"
          className="text-dark-primary hover:text-dark-primary hover:bg-transparent cursor-pointer text-sm font-bold"
        >
          View all
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6 mb-5 p-6 bg-bg rounded-xl">
        <div className="flex-1">
          <div className="text-2xl font-semibold text-primary mb-1">821</div>
          <div className="text-sm text-gray-text font-semibold">Entries</div>
        </div>
        <div className="flex-1">
          <div className="text-2xl font-semibold text-primary mb-1">$10k</div>
          <div className="text-sm text-gray-text font-semibold">Earnings</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid lg:w-full grid-cols-2 bg-bg p-1 h-10 rounded-full">
          <TabsTrigger
            value="all"
            className="rounded-full text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-dark-primary text-gray-text border-0 h-8 data-[state=active]:font-bold"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="won"
            className="rounded-full text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-dark-primary text-gray-text border-0 h-8 data-[state=active]:font-bold"
          >
            Won
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {contestData.map((contest, index) => (
            <div key={contest.id}>
              <Card className="border border-border-color rounded-lg shadow-none">
                <CardContent className="">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[#002913] leading-tight">
                      {contest?.title.split("on")[0] + "on"}{" "}
                      <span className="text-primary">
                        {contest?.title.split("on")[1]}
                      </span>
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-text font-semibold flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M7.99331 1.83331C4.31331 1.83331 1.33331 4.81998 1.33331 8.49998C1.33331 12.18 4.31331 15.1666 7.99331 15.1666C11.68 15.1666 14.6666 12.18 14.6666 8.49998C14.6666 4.81998 11.68 1.83331 7.99331 1.83331ZM7.99998 13.8333C5.05331 13.8333 2.66665 11.4466 2.66665 8.49998C2.66665 5.55331 5.05331 3.16665 7.99998 3.16665C10.9466 3.16665 13.3333 5.55331 13.3333 8.49998C13.3333 11.4466 10.9466 13.8333 7.99998 13.8333Z"
                            fill="#717A75"
                          />
                          <path
                            d="M8.33331 5.16669H7.33331V9.16669L10.8333 11.2667L11.3333 10.4467L8.33331 8.66669V5.16669Z"
                            fill="#717A75"
                          />
                        </svg>{" "}
                        {contest.status}
                      </span>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full bg-bg ${
                          contest.won ? "text-primary" : "text-gray-text"
                        }`}
                      >
                        {contest.result}{" "}
                        <span>{contest?.won ? "🥳" : "🥲"}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-sm font-semibold text-primary">
                          Value: {contest.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 p-2 bg-bg rounded-lg border border-border-color">
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
                        <span className="text-sm font-bold text-dark-primary">
                          {contest.views}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Show claim button after the winning entry */}
                  {contest.won && (
                    <Button className="w-full bg-dark-primary hover:bg-primary cursor-pointer text-white rounded-lg py-2.5 font-medium text-sm mt-3">
                      Claim your prize
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="won" className="mt-4 space-y-4">
          {contestData
            .filter((contest) => contest.won)
            .map((contest) => (
              <div key={contest.id}>
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-2.5">
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">
                        {contest.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              d="M7.99331 1.83331C4.31331 1.83331 1.33331 4.81998 1.33331 8.49998C1.33331 12.18 4.31331 15.1666 7.99331 15.1666C11.68 15.1666 14.6666 12.18 14.6666 8.49998C14.6666 4.81998 11.68 1.83331 7.99331 1.83331ZM7.99998 13.8333C5.05331 13.8333 2.66665 11.4466 2.66665 8.49998C2.66665 5.55331 5.05331 3.16665 7.99998 3.16665C10.9466 3.16665 13.3333 5.55331 13.3333 8.49998C13.3333 11.4466 10.9466 13.8333 7.99998 13.8333Z"
                              fill="#717A75"
                            />
                            <path
                              d="M8.33331 5.16669H7.33331V9.16669L10.8333 11.2667L11.3333 10.4467L8.33331 8.66669V5.16669Z"
                              fill="#717A75"
                            />
                          </svg>{" "}
                          {contest.status}
                        </span>
                        <span className="text-green-600 font-medium text-xs">
                          {contest.result}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-xs text-gray-500">Value: </span>
                          <span className="text-base font-semibold text-gray-900">
                            {contest.value}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{contest.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg py-2.5 font-medium text-sm mt-3 duration-300">
                  Claim your prize
                </Button>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PastContests;
