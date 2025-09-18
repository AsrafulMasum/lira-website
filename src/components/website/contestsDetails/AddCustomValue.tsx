"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddCustomValue = () => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    console.log("Adding value:", value);
    setValue("");
  };

  const handleCancel = () => {
    setValue("");
  };

  return (
    <DialogContent className="sm:max-w-sm p-6 rounded-3xl">
      {/* Main content with custom spacing */}
      <div>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-left text-2xl font-semibold text-[#002913]">
            Add a custom value
          </DialogTitle>
        </DialogHeader>

        <div className="my-6">
          <label className="text-sm text-[#717A75]">Value from 0 to ∞</label>
          <Input
            type="number"
            placeholder="118,000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-14 bg-[#F2F7F5] mt-2"
          />
        </div>
      </div>

      <DialogFooter className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="px-6 bg-[#F2F7F5] flex-1 border-[#E6EBE8] hover:bg-[#F2F7F5] text-[#004721] hover:text-[#004721] h-11 cursor-pointer text-sm font-semibold rounded-2xl"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={!value.trim()}
          className="px-6 bg-[#004721] hover:bg-[#004721] disabled:bg-[#C0CCC5] h-11 cursor-pointer text-sm text-white font-semibold flex-1 rounded-2xl"
        >
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddCustomValue;
