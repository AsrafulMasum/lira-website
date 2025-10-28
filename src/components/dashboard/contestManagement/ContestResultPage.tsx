"use client";

import Loading from "@/app/loading";
import { useGetContestDetailsQuery } from "@/redux/apiSlices/contestSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trophy,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Target,
} from "lucide-react";
import moment from "moment";

const ContestResultPage = ({ params }: { params: { id: string } }) => {
  const { data: getContestResult, isLoading } =
    useGetContestDetailsQuery(params);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const contestData = getContestResult?.data;
  const contest = contestData?.contest;
  const statistics = contestData?.statistics;
  const orders = contestData?.orders || [];

  // Find winner (order with place 1 in result)
  const winner = orders.find((order: any) => order.result?.place === 1);

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Draft: "bg-gray-100 text-gray-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  // Get order status badge color
  const getOrderStatusBadge = (status: string) => {
    const statusColors = {
      processing: "bg-yellow-100 text-yellow-800",
      pending: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest Management
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Contest Results</h1>
          <p className="text-gray-600 mt-2">
            Detailed analysis and participant information for this contest
          </p>
        </div>

        {/* Contest Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Contest Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {contest?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Contest Name</p>
              </div>
              <div>
                <Badge className={getStatusBadge(contest?.status)}>
                  {contest?.status}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">Status</p>
              </div>
              <div>
                <p className="font-semibold text-lg">{contest?.category}</p>
                <p className="text-sm text-gray-600 mt-1">Category</p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  ${contest?.prizePool?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">Prize Pool</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">Start Time</p>
                  <p className="text-sm text-gray-600">
                    {moment(contest?.startTime).format(
                      "MMMM D, YYYY [at] h:mm A"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">End Time</p>
                  <p className="text-sm text-gray-600">
                    {moment(contest?.endTime).format(
                      "MMMM D, YYYY [at] h:mm A"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {contest?.description && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{contest.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold">
                    {statistics?.totalOrders || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Unique Users
                  </p>
                  <p className="text-2xl font-bold">
                    {statistics?.uniqueUsers || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ${statistics?.totalRevenue || 0}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Prediction
                  </p>
                  <p className="text-2xl font-bold">
                    {statistics?.averagePrediction?.toFixed(2) || 0}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Statistics */}
        {statistics && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prediction Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Minimum Prediction
                  </p>
                  <p className="text-xl font-bold">
                    {statistics.minPrediction}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Maximum Prediction
                  </p>
                  <p className="text-xl font-bold">
                    {statistics.maxPrediction}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Prediction
                  </p>
                  <p className="text-xl font-bold">
                    {statistics.averagePrediction?.toFixed(2)}
                  </p>
                </div>
              </div>

              {statistics.statusBreakdown && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4">Order Status Breakdown</h4>
                  <div className="flex gap-4">
                    {Object.entries(statistics.statusBreakdown).map(
                      ([status, count]) => (
                        <div key={status} className="flex items-center gap-2">
                          <Badge className={getOrderStatusBadge(status)}>
                            {status}
                          </Badge>
                          <span className="font-medium">{count as number}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {statistics.stateDistribution && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4">State Distribution</h4>
                  <div className="flex gap-4">
                    {Object.entries(statistics.stateDistribution).map(
                      ([state, count]) => (
                        <div
                          key={state}
                          className="bg-gray-100 px-3 py-1 rounded-full"
                        >
                          <span className="text-sm font-medium">
                            {state}: {count as number}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Winner Section */}
        {winner && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Trophy className="w-5 h-5" />
                Contest Winner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Winner</p>
                  <p className="font-bold text-yellow-900">
                    {winner.user.name}
                  </p>
                  <p className="text-sm text-yellow-700">{winner.user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">
                    Winning Prediction
                  </p>
                  <p className="font-bold text-yellow-900">
                    {winner.result.predictionValue}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">
                    Prize Amount
                  </p>
                  <p className="font-bold text-yellow-900">
                    ${winner.result.prizeAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">
                    Accuracy
                  </p>
                  <p className="font-bold text-yellow-900">
                    {winner.result.percentage}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Participants & Orders</CardTitle>
            <p className="text-sm text-gray-600">
              Complete list of all users who participated in this contest
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Predictions</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-mono text-sm">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.user.name}</p>
                          <p className="text-sm text-gray-600">
                            {order.user.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.user.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.predictions.map(
                            (prediction: any, index: number) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">
                                  {prediction.predictionValue}
                                </span>
                                <span className="text-gray-500 ml-2">
                                  ({prediction.type}) - ${prediction.price}
                                </span>
                              </div>
                            )
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Total: {order.totalPredictions} predictions
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${order.totalAmount}
                      </TableCell>
                      <TableCell>{order.state}</TableCell>
                      <TableCell>
                        <Badge className={getOrderStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.result?.place ? (
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              {order.result.place === 1 && (
                                <Trophy className="w-4 h-4 text-yellow-500" />
                              )}
                              <span className="font-medium">
                                Place: {order.result.place}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              Prize: ${order.result.prizeAmount}
                            </p>
                            <p className="text-gray-600">
                              Accuracy: {order.result.percentage}%
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-500">No result</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {moment(order.createdAt).format("MMM D, YYYY h:mm A")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No orders found for this contest.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContestResultPage;
