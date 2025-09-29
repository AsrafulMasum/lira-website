"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  X,
  Check,
  Search,
  BarChart3,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useGetContestsQuery } from "@/redux/apiSlices/contestSlice";
import Loading from "@/app/loading";

// Sample contest data
const contests = [
  {
    id: 1,
    name: "Rolex Daytona",
    category: "BTC Price",
    status: "Draft",
    entriesSold: 1254,
    entryPrice: "$2 - $6",
    entryTiers: "3 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 2,
    name: "Cartier Love Bracelet",
    category: "Weather",
    status: "Active",
    entriesSold: 1254,
    entryPrice: "$2",
    entryTiers: "",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: true,
  },
  {
    id: 3,
    name: "Bulgari Necklace",
    category: "BTC Price",
    status: "Draft",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "5 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 4,
    name: "Diamond Studs",
    category: "BTC Price",
    status: "Done",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 5,
    name: "AP Royal Oak",
    category: "Weather",
    status: "Active",
    entriesSold: 1254,
    entryPrice: "$2",
    entryTiers: "",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: true,
  },
  {
    id: 6,
    name: "Patek Philippe Aquanaut",
    category: "BTC Price",
    status: "Deleted",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 7,
    name: "Omega Speedmaster",
    category: "BTC Price",
    status: "Draft",
    entriesSold: 1254,
    entryPrice: "$2 - $6",
    entryTiers: "3 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 8,
    name: "Tiffany Ring",
    category: "Weather",
    status: "Active",
    entriesSold: 1254,
    entryPrice: "$2",
    entryTiers: "",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: true,
  },
  {
    id: 9,
    name: "Hermès Birkin",
    category: "BTC Price",
    status: "Draft",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 10,
    name: "Dior Lady Dior",
    category: "BTC Price",
    status: "Done",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 11,
    name: "Tiffany Ring",
    category: "Weather",
    status: "Active",
    entriesSold: 1254,
    entryPrice: "$2",
    entryTiers: "",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: true,
  },
  {
    id: 12,
    name: "Hermès Birkin",
    category: "BTC Price",
    status: "Draft",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
  {
    id: 13,
    name: "Dior Lady Dior",
    category: "BTC Price",
    status: "Done",
    entriesSold: 1254,
    entryPrice: "$2 - $12",
    entryTiers: "6 tiers",
    endDate: "01/07/25, 3:00 PM",
    prizeType: "Cash",
    featured: false,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          {status}
        </Badge>
      );
    case "Draft":
      return <Badge variant="secondary">{status}</Badge>;
    case "Done":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          {status}
        </Badge>
      );
    case "Deleted":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const ContestManagementPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: getAllContestsData, isLoading } =
    useGetContestsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const contestsData = getAllContestsData?.data || [];

  const handleFeaturedToggle = (contestId: number) => {};

  // Pagination logic
  const totalItems = contestsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContests = contestsData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-[#004721]">
          Contest management
        </h2>
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/new-contest")}
        >
          <Plus className="w-4 h-4 mr-2" /> New Contest
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-t-2xl border-x border-t">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, category..."
              className="pl-10 h-9 bg-bg"
            />
          </div>

          {/* Status Filter */}
          <Select>
            <SelectTrigger className="w-[120px] bg-bg font-bold">
              <SelectValue
                placeholder={<p className="text-primary font-bold">Status</p>}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>

          {/* Categories Filter */}
          <Select>
            <SelectTrigger className="w-[140px] bg-bg font-bold">
              <SelectValue
                placeholder={
                  <p className="text-primary font-bold">Categories</p>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="btc-price">BTC Price</SelectItem>
              <SelectItem value="weather">Weather</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2">
          <Link href={"/dashboard/organize"}>
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer text-primary font-bold bg-bg"
            >
              <Settings className="w-4 h-4" />
              Organize
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer text-primary font-bold bg-bg"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-b-lg p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Entries sold</TableHead>
              <TableHead>Entry price</TableHead>
              <TableHead>End date</TableHead>
              <TableHead>Prize type</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentContests?.map((contest: any) => (
              <TableRow key={contest._id}>
                <TableCell className="font-medium">{contest.name}</TableCell>
                <TableCell>{contest?.categoryId?.name}</TableCell>
                <TableCell>{getStatusBadge(contest.status)}</TableCell>
                <TableCell>
                  {contest.entriesSold
                    ? contest.entriesSold.toLocaleString()
                    : "0"}
                </TableCell>
                <TableCell>
                  <div>
                    <div>{contest.entryPrice}</div>
                    {contest?.pricing?.tiers?.length && (
                      <div className="text-xs text-gray-500">
                        {contest.pricing?.tiers?.length} tiers
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{moment(contest.endDate).format("lll")}</TableCell>
                <TableCell>{contest?.prize?.type}</TableCell>
                <TableCell>
                  <Switch
                    className="w-8 h-5"
                    checked={contest.featured}
                    onCheckedChange={() => handleFeaturedToggle(contest.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {contest.status === "Draft" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                          title="Upload"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                          title="Copy"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 bg-red-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {contest.status === "Active" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 bg-red-50 cursor-pointer"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100 bg-bg cursor-pointer"
                          title="Mark as Complete"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                          title="Copy"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {contest.status === "Done" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                          title="Copy"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 bg-red-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {contest.status === "Deleted" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-bg text-primary cursor-pointer"
                        title="Copy"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} contests
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={handlePrevious}
          >
            &lt;
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={
                currentPage === page ? "bg-green-600 hover:bg-green-700" : ""
              }
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContestManagementPage;
