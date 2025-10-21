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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  useDeleteContestMutation,
  useGetContestsQuery,
  usePublishContestMutation,
} from "@/redux/apiSlices/contestSlice";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { useGetAllCategoryQuery } from "@/redux/apiSlices/categoryUnitTypeSlice";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contestToDelete, setContestToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Prepare query parameters for API call
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
    status: statusFilter,
    categoryId: categoryFilter,
  };

  const { data: getAllContestsData, isLoading } =
    useGetContestsQuery(queryParams);
  const { data: getAllCategoriesData, isLoading: isLoadingCategories } =
    useGetAllCategoryQuery(undefined);
  const [publishContest] = usePublishContestMutation();
  const [deleteContest] = useDeleteContestMutation();

  if (isLoading || isLoadingCategories) {
    return <Loading />;
  }

  const contestsData = getAllContestsData?.data || [];
  const paginationInfo = getAllContestsData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };
  const categoriesData = getAllCategoriesData?.data || [];

  const handleFeaturedToggle = async (contest: any) => {
    try {
      await publishContest({
        contestId: contest._id,
      }).unwrap();
      toast.success(
        `Contest ${contest.featured ? "unpublished" : "published"} successfully`
      );
    } catch (error) {
      toast.error(
        `Failed to ${contest.featured ? "unpublish" : "publish"} contest`
      );
      console.error("Publish error:", error);
    }
  };

  const handleDeleteClick = (contest: any) => {
    setContestToDelete(contest);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!contestToDelete) return;

    try {
      setIsDeleting(true);
      await deleteContest(contestToDelete._id).unwrap();
      toast.success("Contest deleted successfully");
      setDeleteDialogOpen(false);
      setContestToDelete(null);
    } catch (error) {
      toast.error("Failed to delete contest");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (paginationInfo.page > 1) {
      setCurrentPage(paginationInfo.page - 1);
    }
  };

  const handleNext = () => {
    if (paginationInfo.page < paginationInfo.totalPage) {
      setCurrentPage(paginationInfo.page + 1);
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#002913]">
              Delete Contest
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete &quot;{contestToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-bg border-border-color hover:bg-bg text-dark-primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Contest"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-t-2xl border-x border-t">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, category..."
              className="pl-10 h-9 bg-bg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] bg-bg font-bold">
              <SelectValue
                placeholder={<p className="text-primary font-bold">Status</p>}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>

          {/* Categories Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] bg-bg font-bold">
              <SelectValue
                placeholder={
                  <p className="text-primary font-bold">Categories</p>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoriesData?.map((category: any) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
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
          <Link href={"/dashboard/analytics"}>
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer text-primary font-bold bg-bg"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
          </Link>
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
            {contestsData?.map((contest: any) => (
              <TableRow key={contest._id}>
                <TableCell>{`${contest.name?.slice(0, 40)}${
                  contest.name?.length > 40 ? "..." : ""
                }`}</TableCell>
                <TableCell>{contest?.categoryId?.name}</TableCell>
                <TableCell>{getStatusBadge(contest.status)}</TableCell>
                <TableCell>
                  {contest.entriesSold
                    ? contest.entriesSold.toLocaleString()
                    : "0"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      ${contest?.pricing?.minTierPrice} - $
                      {contest?.pricing?.maxTierPrice}
                    </div>
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
                    checked={contest.status === "Active"}
                    onCheckedChange={() => handleFeaturedToggle(contest)}
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
                          onClick={() => {
                            publishContest({
                              contestId: contest._id,
                            })
                              .unwrap()
                              .then(() =>
                                toast.success("Contest published successfully")
                              )
                              .catch((error) => {
                                toast.error("Failed to publish contest");
                                console.error("Publish error:", error);
                              });
                          }}
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
                          onClick={() => handleDeleteClick(contest)}
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
          Showing {((paginationInfo.page - 1) * paginationInfo.limit) + 1} to{" "}
          {Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of{" "}
          {paginationInfo.total} contests
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
          {Array.from({ length: paginationInfo.totalPage }, (_, i) => i + 1).map((page) => (
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
            disabled={currentPage === paginationInfo.totalPage}
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
