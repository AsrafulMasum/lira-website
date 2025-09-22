"use client";

import React from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ContestData {
  category: string;
  name: string;
  description: string;
  statesAllowed: string;
  prizeTitle: string;
  prizeType: string;
  prizeImage?: File;
}

interface DetailsStepProps {
  data: ContestData;
  onUpdate: (data: Partial<ContestData>) => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: keyof ContestData, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ prizeImage: file });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Details</h1>
      </div>

      {/* Contest Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">Contest</h2>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            value={data.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search the category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btc-price">BTC Price</SelectItem>
              <SelectItem value="weather">Weather</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="stocks">Stocks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <Input
            placeholder="Placeholder"
            value={data.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            placeholder="Placeholder"
            value={data.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full min-h-[120px] resize-none"
          />
        </div>

        {/* States Allowed */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">
            States allowed
          </span>
          <span className="text-sm font-medium text-green-600">All states</span>
        </div>
      </div>

      {/* Prize Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">Prize</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Prize Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input
              placeholder="Placeholder"
              value={data.prizeTitle}
              onChange={(e) => handleInputChange("prizeTitle", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Prize Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <Select
              value={data.prizeType}
              onValueChange={(value) => handleInputChange("prizeType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Gift Card">Gift Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
            <div className="space-y-4">
              <div className="text-gray-500">
                <p className="text-sm">Drop an image here</p>
                <p className="text-xs text-gray-400">PNG, JPEG, WEBP, GIF</p>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>

              {data.prizeImage && (
                <p className="text-sm text-green-600 mt-2">
                  {data.prizeImage.name} uploaded
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
