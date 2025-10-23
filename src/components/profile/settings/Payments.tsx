"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddCardForWithdrawal from "./AddCardForWithdrawal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiRequest } from "@/helpers/apiRequest";
import { toast } from "sonner";
import { revalidateTags } from "@/helpers/revalidateTags";

const stripePromise = loadStripe(
  "pk_test_51OHIrVB5u2A30G2QtLI2flRDD3KmQRlRafCke1GGcAl43X9IXi4Ymislp3NW7bg4NYYVcBrebbPcN17g2EyUqOH2009gKcWQo6"
);
const Payments = ({ cards }: any) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (cardId: string) => {
    try {
      const res = await apiRequest(`/withdrawals/cards/${cardId}`, {
        method: "DELETE",
      });
      if (res?.success) {
        toast.success("Card deleted successfully");
        revalidateTags(["cards"]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete card");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* <div className="flex items-center justify-between border border-border-color rounded-2xl bg-white p-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900">
            Visa ending in 4242
          </h3>
          <p className="text-sm text-gray-500">Primary payment method</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div> */}

      {cards?.map((card: any) => (
        <div key={card?._id} className="flex items-center justify-between border border-border-color rounded-2xl bg-white p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900 capitalize">
              {card?.brand} ending in {card?.expiryYear}
            </h3>
            <p className="text-sm text-gray-500">
              **** **** **** {card?.last4}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleDelete(card?.cardId)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full text-dark-primary hover:text-primary border-border-color hover:bg-transparent cursor-pointer bg-bg shadow-none"
          >
            <Plus className="size-4 text-dark-primary h-10 mr-2" />
            Add a debit/credit card
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogTitle>Add Debit Card</DialogTitle>
          {/* Wrap with Stripe Elements if not already wrapped */}

          <Elements stripe={stripePromise}>
            <AddCardForWithdrawal onCardAdded={() => setOpen(false)} />
          </Elements>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;
