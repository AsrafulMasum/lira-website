import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";

const Payments = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between border border-border-color rounded-2xl bg-white p-6">
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
      </div>

      <div className="flex items-center justify-between border border-border-color rounded-2xl bg-white p-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900">
            Visa ending in 4204
          </h3>
          <p className="text-sm text-gray-500">Secondary payment method</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full text-dark-primary hover:text-primary border-border-color hover:bg-transparent cursor-pointer bg-bg shadow-none"
      >
        <Plus className="size-4 text-dark-primary h-10 mr-2" />
        Add a debit/credit card
      </Button>
    </div>
  );
};

export default Payments;
