"use client";

import Loading from "@/app/loading";
import {
  useCreateManualContestWinnerMutation,
  useGetManualWinnerContestQuery,
} from "@/redux/apiSlices/contestSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Contest {
  id: string;
  name: string;
  category: string;
  endTime: string;
  prizePool: number;
  totalEntries: number;
  hasMetadata: boolean;
}

const ManualContestPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [categoryValueAtEndTime, setCategoryValueAtEndTime] = useState("");

  const {
    data: getManualWinnerContest,
    isLoading,
    error,
  } = useGetManualWinnerContestQuery({ page: 1, limit: 10 });
  const [manuallyGiveCategoryValue, { isLoading: isCreating }] =
    useCreateManualContestWinnerMutation();

  const handleViewDetails = (contest: Contest) => {
    setSelectedContest(contest);
    setCategoryValueAtEndTime("");
    setOpen(true);
  };

  const handleSaveCategory = async () => {
    const res = await manuallyGiveCategoryValue({
      contestId: selectedContest?.id || "",
      data: {
        actualValue: categoryValueAtEndTime,
      },
    });

    if (res?.data?.success) {
      toast.success("Category value saved successfully");
      setOpen(false);
    } else {
      toast.error(res?.data?.message || "Failed to save category value");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <h3 className="text-red-800 font-medium">Error Loading Contests</h3>
            <p className="text-red-600 text-sm mt-1">
              Failed to load manual winner contests. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const contestData: Contest[] = getManualWinnerContest?.data?.result || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Manual Contest Management
          </CardTitle>
          <p className="text-muted-foreground">Manage contests</p>
        </CardHeader>
      </Card>

      {contestData.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="font-medium text-lg mb-2">No Contests Found</h3>
            <p className="text-muted-foreground">
              There are no pending manual winner contests at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Contest Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Prize Pool</TableHead>
                <TableHead>Total Entries</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contestData.map((contest) => (
                <TableRow key={contest.id}>
                  <TableCell className="font-medium">{contest.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{contest.category}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(contest.endTime)}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(contest.prizePool)}
                  </TableCell>
                  <TableCell>{contest.totalEntries}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(contest)}
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Contest Details</DialogTitle>
            <DialogDescription>
              Enter the category value at the end time of the contest
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Contest Name</Label>
              <div className="col-span-3 text-sm">{selectedContest?.name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Category</Label>
              <div className="col-span-3 text-sm">
                <Badge variant="secondary">{selectedContest?.category}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">End Time</Label>
              <div className="col-span-3 text-sm">
                {selectedContest && formatDate(selectedContest.endTime)}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="categoryAtEndTime"
                className="text-right font-medium"
              >
                Category Value at End Time
              </Label>
              <Input
                id="categoryAtEndTime"
                value={categoryValueAtEndTime}
                onChange={(e) => setCategoryValueAtEndTime(e.target.value)}
                placeholder="Enter category value at end time"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveCategory}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualContestPage;
