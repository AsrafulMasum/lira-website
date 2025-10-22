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
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const AddCustomValue = () => {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const existing = searchParams.get("customValue");
    const values = existing ? existing.split(",") : [];

    // avoid duplicates & empty values
    if (value.trim() && !values.includes(value.trim())) {
      values.push(value.trim());
    }

    updateSearchParams({ customValue: values.join(",") });
    setValue("");
  };

  const handleCancel = () => {
    setValue("");
    updateSearchParams({ customValue: null });
  };

  return (
    <DialogContent className="sm:max-w-sm p-6 rounded-3xl">
      <div>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-left text-2xl font-semibold text-[#002913]">
            Add a custom value
          </DialogTitle>
        </DialogHeader>

        <div className="my-6">
          <label className="text-sm text-gray">Value from 0 to ∞</label>
          <Input
            type="number"
            placeholder="118,000"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-14 bg-bg mt-2"
          />
        </div>
      </div>

      <DialogFooter className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="px-6 bg-bg flex-1 border-border-color hover:bg-bg text-dark-primary hover:text-dark-primary h-11 cursor-pointer text-sm font-semibold rounded-2xl"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={!value.trim()}
          className="px-6 bg-dark-primary hover:bg-dark-primary disabled:bg-[#C0CCC5] h-11 cursor-pointer text-sm text-white font-semibold flex-1 rounded-2xl"
        >
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddCustomValue;
