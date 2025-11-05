import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import moment from "moment";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MyEntriesSheet from "../ongoingContests/MyEntriesSheet";

interface PastContest {
  _id: string;
  contestName: string;
  contestId: string;
  endTime: string;
  status: string;
  result: {
    prizeAmount: string;
  };
  predictions: Array<any>;
}
const PastContests = ({
  pastAnalytics,
  pastContestsRes,
}: {
  pastAnalytics?: any;
  pastContestsRes?: any;
}) => {
  const pastContests = pastContestsRes?.data;

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
          <div className="text-2xl font-semibold text-primary mb-1">
            {pastAnalytics?.totalEntries}
          </div>
          <div className="text-sm text-gray-text font-semibold">Entries</div>
        </div>
        <div className="flex-1">
          <div className="text-2xl font-semibold text-primary mb-1">
            $ {pastAnalytics?.totalWin}
          </div>
          <div className="text-sm text-gray-text font-semibold">Earnings</div>
        </div>
      </div>

      {/* Filter Tabs */}
      {pastContests?.length > 0 ? (
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
            {pastContests.map((contest: PastContest) => (
              <div key={contest?._id}>
                <Card className="border border-border-color rounded-lg shadow-none">
                  <CardContent className="">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-[#002913] leading-tight">
                        {contest?.contestName} on{" "}
                        <span className="text-primary">
                          {moment(contest?.endTime).format(
                            "MMMM D [at] h:mm A"
                          )}
                        </span>{" "}
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
                          Ended{" "}
                          {moment(contest?.endTime).format(
                            "MMMM D [at] h:mm A"
                          )}
                        </span>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full bg-bg ${
                            contest?.status === "won"
                              ? "text-primary"
                              : "text-gray-text"
                          }`}
                        >
                          {contest?.status}{" "}
                          <span>{contest?.status === "won" ? "🥳" : "🥲"}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-sm font-semibold text-primary">
                            Value: $ {contest?.result?.prizeAmount}
                          </span>
                        </div>

                        <Sheet>
                          <SheetTrigger asChild>
                            <button className="flex items-center gap-1 p-2 bg-bg rounded-lg border border-border-color cursor-pointer">
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
                                {contest?.predictions?.length}
                              </span>
                            </button>
                          </SheetTrigger>
                          <MyEntriesSheet items={contest?.predictions} />
                        </Sheet>
                      </div>
                    </div>

                    {/* Show claim button after the winning entry */}
                    {contest?.status === "won" && (
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
            {pastContests
              .filter((contest: PastContest) => contest.status === "won")
              .map((contest: PastContest) => (
                <div key={contest._id}>
                  <Card className="border border-border-color rounded-lg shadow-none">
                    <CardContent className="">
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-[#002913] leading-tight">
                          {contest?.contestName} on{" "}
                          <span className="text-primary">
                            {moment(contest?.endTime).format(
                              "MMMM D [at] h:mm A"
                            )}
                          </span>{" "}
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
                            Ended{" "}
                            {moment(contest?.endTime).format(
                              "MMMM D [at] h:mm A"
                            )}
                          </span>
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full bg-bg ${
                              contest?.status === "won"
                                ? "text-primary"
                                : "text-gray-text"
                            }`}
                          >
                            {contest?.status}{" "}
                            <span>
                              {contest?.status === "won" ? "🥳" : "🥲"}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-sm font-semibold text-primary">
                              Value: $ {contest?.result?.prizeAmount}
                            </span>
                          </div>

                          <Sheet>
                            <SheetTrigger asChild>
                              <button className="flex items-center gap-1 p-2 bg-bg rounded-lg border border-border-color cursor-pointer">
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
                                <span className="text-xs md:text-sm font-bold text-dark-primary">
                                  {contest?.predictions?.length}
                                </span>
                              </button>
                            </SheetTrigger>
                            <MyEntriesSheet items={contest?.predictions} />
                          </Sheet>
                        </div>
                      </div>

                      {/* Show claim button after the winning entry */}
                      {contest?.status === "won" && (
                        <Button className="w-full bg-dark-primary hover:bg-primary cursor-pointer text-white rounded-lg py-2.5 font-medium text-sm mt-3">
                          Claim your prize
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="bg-bg h-full p-6 flex justify-center rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="105"
            height="132"
            viewBox="0 0 105 132"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52598 46.7604C5.52598 20.9331 26.4591 0 52.2864 0C78.1138 0 99.0469 20.9331 99.0469 46.7604V90.9495C99.0469 94.6794 94.875 96.5342 92.0358 94.4918C90.5224 93.4003 89.0893 92.5365 87.9778 92.2285C86.6184 91.8401 85.0916 91.6392 83.5715 91.6928C81.8038 91.753 80.1095 92.1615 78.6764 92.9651C78.0804 93.3066 77.4911 93.6816 76.8817 94.0767C74.5714 95.5633 72.0202 97.2039 67.8818 97.2039C63.7433 97.2039 61.1921 95.5633 58.8818 94.0767C58.2791 93.6816 57.6898 93.3066 57.0871 92.9651C55.6809 92.1749 54.0201 91.7664 52.2857 91.6928C50.5514 91.7664 48.8906 92.1749 47.4844 92.9651C46.8817 93.3066 46.2924 93.6816 45.6897 94.0767C43.3794 95.5633 40.8282 97.2039 36.6897 97.2039C32.5513 97.2039 30.0001 95.5633 27.6898 94.0767C27.0804 93.6816 26.4911 93.3066 25.8951 92.9651C24.462 92.1615 22.7679 91.753 20.9999 91.6928C19.4799 91.6392 17.9531 91.8401 16.5937 92.2285C15.4821 92.5365 14.049 93.4003 12.5357 94.4918C9.69649 96.5342 5.52461 94.6794 5.52461 90.9495L5.52598 46.7604ZM7.68083 123.428C9.99117 122.819 13.299 122.236 17.4375 121.741C26.3036 120.669 38.6243 120 52.2854 120C65.9465 120 78.267 120.669 87.1333 121.741C91.2717 122.236 94.5798 122.819 96.89 123.428C94.5796 124.038 91.2717 124.62 87.1333 125.116C78.2672 126.187 65.9465 126.857 52.2854 126.857C38.6243 126.857 26.3038 126.187 17.4375 125.116C13.299 124.62 9.991 124.038 7.68083 123.428ZM16.8214 116.631C25.9486 115.533 38.4916 114.857 52.2864 114.857C66.0812 114.857 78.6229 115.533 87.7515 116.631C92.2916 117.181 96.0885 117.85 98.8005 118.62C100.133 119.002 101.359 119.451 102.296 120.007C103.039 120.442 104.573 121.506 104.573 123.428C104.573 125.35 103.039 126.415 102.296 126.85C101.359 127.406 100.133 127.855 98.8005 128.236C96.0885 129.007 92.2916 129.676 87.7515 130.225C78.6243 131.324 66.0812 132 52.2864 132C38.4916 132 25.9499 131.324 16.8214 130.225C12.2813 129.676 8.48432 129.007 5.77232 128.236C4.43975 127.855 3.21428 127.406 2.27674 126.85C1.53344 126.415 0 125.35 0 123.428C0 121.506 1.53348 120.442 2.27674 120.007C3.21424 119.451 4.43964 119.002 5.77232 118.62C8.48432 117.85 12.2813 117.181 16.8214 116.631Z"
              fill="#FAFFFC"
            />
            <path
              d="M75.2423 42.221C75.2423 45.2745 72.7647 47.7456 69.7177 47.7456C66.6643 47.7456 64.1931 45.2747 64.1931 42.221C64.1931 39.1742 66.6641 36.6964 69.7177 36.6964C72.7645 36.6964 75.2423 39.1741 75.2423 42.221Z"
              fill="#E6EBE8"
            />
            <path
              d="M42.0949 42.221C42.0949 45.2745 39.6239 47.7456 36.5703 47.7456C33.5235 47.7456 31.0457 45.2747 31.0457 42.221C31.0457 39.1742 33.5233 36.6964 36.5703 36.6964C39.6237 36.6964 42.0949 39.1741 42.0949 42.221Z"
              fill="#E6EBE8"
            />
            <path
              d="M75.2423 42.221C75.2423 45.2745 72.7647 47.7456 69.7177 47.7456C66.6643 47.7456 64.1931 45.2747 64.1931 42.221C64.1931 39.1742 66.6641 36.6964 69.7177 36.6964C72.7645 36.6964 75.2423 39.1741 75.2423 42.221Z"
              fill="#E6EBE8"
            />
            <path
              d="M42.0949 42.221C42.0949 45.2745 39.6239 47.7456 36.5703 47.7456C33.5235 47.7456 31.0457 45.2747 31.0457 42.221C31.0457 39.1742 33.5233 36.6964 36.5703 36.6964C39.6237 36.6964 42.0949 39.1741 42.0949 42.221Z"
              fill="#E6EBE8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52598 46.7604C5.52598 20.9331 26.4591 0 52.2864 0C78.1138 0 99.0469 20.9331 99.0469 46.7604V90.9495C99.0469 94.6794 94.875 96.5342 92.0358 94.4918C90.5224 93.4003 89.0893 92.5365 87.9778 92.2285C86.6184 91.8401 85.0916 91.6392 83.5715 91.6928C81.8038 91.753 80.1095 92.1615 78.6764 92.9651C78.0804 93.3066 77.4911 93.6816 76.8817 94.0767C74.5714 95.5633 72.0202 97.2039 67.8818 97.2039C63.7433 97.2039 61.1921 95.5633 58.8818 94.0767C58.2791 93.6816 57.6898 93.3066 57.0871 92.9651C55.6809 92.1749 54.0201 91.7664 52.2857 91.6928C50.5514 91.7664 48.8906 92.1749 47.4844 92.9651C46.8817 93.3066 46.2924 93.6816 45.6897 94.0767C43.3794 95.5633 40.8282 97.2039 36.6897 97.2039C32.5513 97.2039 30.0001 95.5633 27.6898 94.0767C27.0804 93.6816 26.4911 93.3066 25.8951 92.9651C24.462 92.1615 22.7679 91.753 20.9999 91.6928C19.4799 91.6392 17.9531 91.8401 16.5937 92.2285C15.4821 92.5365 14.049 93.4003 12.5357 94.4918C9.69649 96.5342 5.52461 94.6794 5.52461 90.9495L5.52598 46.7604ZM52.2864 5.14284C29.3048 5.14284 10.6688 23.7788 10.6688 46.7604V89.5232C12.0282 88.6192 13.6153 87.7218 15.1956 87.2732C17.0437 86.7576 19.0995 86.4763 21.1822 86.55C23.5996 86.637 26.1308 87.1995 28.4211 88.4852C29.5059 89.1013 30.3563 89.637 31.0863 90.0991C33.0819 91.3714 34.1733 92.0611 36.6911 92.0611C39.2089 92.0611 40.3005 91.3713 42.2959 90.0991C43.0258 89.637 43.8763 89.1013 44.9611 88.4852C47.2512 87.1995 49.7825 86.637 52.2 86.55H52.3741C54.7916 86.637 57.3227 87.1995 59.613 88.4852C60.6978 89.1013 61.5483 89.637 62.2782 90.0991C64.2738 91.3714 65.3653 92.0611 67.8831 92.0611C70.4008 92.0611 71.4925 91.3713 73.4879 90.0991C74.2178 89.637 75.0682 89.1013 76.1531 88.4852C78.4432 87.1995 80.9745 86.637 83.392 86.55C85.4745 86.4763 87.5304 86.7575 89.3786 87.2732C90.959 87.7218 92.5461 88.6192 93.9053 89.5232V46.7604C93.9053 23.7788 75.2681 5.14284 52.2864 5.14284ZM16.8214 116.631C25.9486 115.533 38.4916 114.857 52.2864 114.857C66.0812 114.857 78.6229 115.533 87.7515 116.631C92.2916 117.181 96.0885 117.85 98.8005 118.62C100.133 119.002 101.359 119.451 102.296 120.007C103.039 120.442 104.573 121.506 104.573 123.428C104.573 125.35 103.039 126.415 102.296 126.85C101.359 127.406 100.133 127.855 98.8005 128.236C96.0885 129.007 92.2916 129.676 87.7515 130.225C78.6243 131.324 66.0812 132 52.2864 132C38.4916 132 25.9499 131.324 16.8214 130.225C12.2813 129.676 8.48432 129.007 5.77232 128.236C4.43975 127.855 3.21428 127.406 2.27674 126.85C1.53344 126.415 0 125.35 0 123.428C0 121.506 1.53348 120.442 2.27674 120.007C3.21424 119.451 4.43964 119.002 5.77232 118.62C8.48432 117.85 12.2813 117.181 16.8214 116.631Z"
              fill="#E6EBE8"
            />
            <path
              d="M75.2423 42.221C75.2423 45.2745 72.7647 47.7456 69.7177 47.7456C66.6643 47.7456 64.1931 45.2747 64.1931 42.221C64.1931 39.1742 66.6641 36.6964 69.7177 36.6964C72.7645 36.6964 75.2423 39.1741 75.2423 42.221Z"
              fill="#E6EBE8"
            />
            <path
              d="M42.0949 42.221C42.0949 45.2745 39.6239 47.7456 36.5703 47.7456C33.5235 47.7456 31.0457 45.2747 31.0457 42.221C31.0457 39.1742 33.5233 36.6964 36.5703 36.6964C39.6237 36.6964 42.0949 39.1741 42.0949 42.221Z"
              fill="#E6EBE8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42.2864 40.7273C42.2864 37.5653 39.375 35 35.7864 35C32.1978 35 29.2864 37.5653 29.2864 40.7273V43.2727C29.2864 46.4347 32.1978 49 35.7864 49C39.375 49 42.2864 46.4347 42.2864 43.2727V40.7273Z"
              fill="#E6EBE8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52598 46.7604C5.52598 20.9331 26.4591 0 52.2864 0C78.1138 0 99.0469 20.9331 99.0469 46.7604V90.9495C99.0469 94.6794 94.875 96.5342 92.0358 94.4918C90.5224 93.4003 89.0893 92.5365 87.9778 92.2285C86.6184 91.8401 85.0916 91.6392 83.5715 91.6928C81.8038 91.753 80.1096 92.1615 78.6764 92.9651C78.0804 93.3066 77.4911 93.6816 76.8817 94.0767C74.5714 95.5633 72.0202 97.2039 67.8818 97.2039C63.7433 97.2039 61.1921 95.5633 58.8818 94.0767C58.2791 93.6816 57.6898 93.3066 57.0871 92.9651C55.6809 92.1749 54.0201 91.7664 52.2857 91.6928C50.5514 91.7664 48.8906 92.1749 47.4844 92.9651C46.8817 93.3066 46.2924 93.6816 45.6897 94.0767C43.3794 95.5633 40.8282 97.2039 36.6897 97.2039C32.5513 97.2039 30.0001 95.5633 27.6898 94.0767C27.0804 93.6816 26.4911 93.3066 25.8951 92.9651C24.462 92.1615 22.7679 91.753 20.9999 91.6928C19.4799 91.6392 17.9531 91.8401 16.5937 92.2285C15.4821 92.5365 14.049 93.4003 12.5357 94.4918C9.69649 96.5342 5.52461 94.6794 5.52461 90.9495L5.52598 46.7604ZM52.2864 5.14284C29.3048 5.14284 10.6688 23.7788 10.6688 46.7604V89.5232C12.0282 88.6192 13.6153 87.7218 15.1956 87.2732C17.0437 86.7576 19.0995 86.4763 21.1822 86.55C23.5996 86.637 26.1308 87.1995 28.4211 88.4852C29.5059 89.1013 30.3563 89.637 31.0863 90.0991C33.0819 91.3714 34.1733 92.0611 36.6911 92.0611C39.2089 92.0611 40.3005 91.3713 42.2959 90.0991C43.0258 89.637 43.8763 89.1013 44.9611 88.4852C47.2512 87.1995 49.7825 86.637 52.2 86.55H52.3741C54.7916 86.637 57.3227 87.1995 59.613 88.4852C60.6978 89.1013 61.5483 89.637 62.2782 90.0991C64.2738 91.3714 65.3653 92.0611 67.8831 92.0611C70.4008 92.0611 71.4925 91.3713 73.4879 90.0991C74.2178 89.637 75.0682 89.1013 76.1531 88.4852C78.4432 87.1995 80.9745 86.637 83.392 86.55C85.4745 86.4763 87.5304 86.7575 89.3786 87.2732C90.959 87.7218 92.5461 88.6192 93.9053 89.5232V46.7604C93.9053 23.7788 75.2681 5.14284 52.2864 5.14284ZM7.68083 123.428C9.99117 122.819 13.299 122.236 17.4375 121.741C26.3036 120.669 38.6243 120 52.2854 120C65.9465 120 78.267 120.669 87.1333 121.741C91.2717 122.236 94.5798 122.819 96.89 123.428C94.5796 124.038 91.2717 124.62 87.1333 125.116C78.2672 126.187 65.9465 126.857 52.2854 126.857C38.6243 126.857 26.3038 126.187 17.4375 125.116C13.299 124.62 9.991 124.038 7.68083 123.428ZM16.8214 116.631C25.9486 115.533 38.4916 114.857 52.2864 114.857C66.0812 114.857 78.6229 115.533 87.7515 116.631C92.2916 117.181 96.0885 117.85 98.8005 118.62C100.133 119.002 101.359 119.451 102.296 120.007C103.039 120.442 104.573 121.507 104.573 123.428C104.573 125.35 103.039 126.415 102.296 126.85C101.359 127.406 100.133 127.855 98.8005 128.236C96.0885 129.006 92.2916 129.676 87.7515 130.225C78.6243 131.324 66.0812 132 52.2864 132C38.4916 132 25.9499 131.324 16.8214 130.225C12.2813 129.676 8.48432 129.007 5.77232 128.236C4.43975 127.855 3.21428 127.406 2.27674 126.85C1.53344 126.415 0 125.35 0 123.428C0 121.507 1.53348 120.442 2.27674 120.007C3.21424 119.451 4.43964 119.002 5.77232 118.62C8.48432 117.85 12.2813 117.181 16.8214 116.631Z"
              fill="#E6EBE8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M43.2338 58.1717C43.2338 59.7333 44.5068 61.0002 46.0759 61.0002H57.4443C59.0133 61.0002 60.2864 59.7333 60.2864 58.1717C60.2864 56.6101 59.0133 55.3431 57.4443 55.3431H46.0759C44.5068 55.3431 43.2338 56.6101 43.2338 58.1717Z"
              fill="#E6EBE8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M75.2864 40.7273C75.2864 37.5653 72.375 35 68.7864 35C65.1978 35 62.2864 37.5653 62.2864 40.7273V43.2727C62.2864 46.4347 65.1978 49 68.7864 49C72.375 49 75.2864 46.4347 75.2864 43.2727V40.7273Z"
              fill="#E6EBE8"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PastContests;
