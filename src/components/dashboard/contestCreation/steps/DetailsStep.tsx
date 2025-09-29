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
import StatesSelectionModal from "../StatesSelectionModal";
import Image from "next/image";
import {
  useGetAllCategoryQuery,
  useGetAllUnitOrTypeQuery,
} from "@/redux/apiSlices/categoryUnitTypeSlice";
import Loading from "@/app/loading";

interface ContestData {
  category: string;
  name: string;
  description: string;
  statesAllowed: string[];
  prizeTitle: string;
  prizeType: string;
  prizePool: number;
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

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoryQuery(undefined);

  const { data: getAllType, isLoading: isLoadingTypes } =
    useGetAllUnitOrTypeQuery("type");

  if (isLoadingCategories || isLoadingTypes) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const categoryOptions = categories?.data?.map((category: any) => ({
    value: category._id,
    label: category.name,
  }));

  const typeOptions = getAllType?.data?.map((type: any) => ({
    value: type.content,
    label: type.content,
  }));

  const handleStatesChange = (states: string[]) => {
    onUpdate({ statesAllowed: states });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ prizeImage: file });
    }
  };

  const removeImage = () => {
    onUpdate({ prizeImage: undefined });
  };

  const getStatesDisplayText = () => {
    if (!data.statesAllowed || data.statesAllowed.length === 0) {
      return "Select states";
    }
    if (data.statesAllowed.length === 50) {
      return "All states";
    }
    if (data.statesAllowed.length === 1) {
      return data.statesAllowed[0];
    }
    return `${data.statesAllowed.length} states selected`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
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
            <SelectTrigger className="w-full mt-2 py-6">
              <SelectValue placeholder="Select the category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
            className="w-full mt-2"
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
            className="w-full min-h-[120px] mt-2 resize-none"
          />
        </div>

        {/* States Allowed */}
        <StatesSelectionModal
          selectedStates={data.statesAllowed || []}
          onStatesChange={handleStatesChange}
        >
          <div className="flex items-center border py-4 bg-bg justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <span className="text-sm font-medium text-green-600">
              States allowed
            </span>
            <span
              className={`text-sm font-medium ${
                !data.statesAllowed || data.statesAllowed.length === 0
                  ? "text-gray-400"
                  : "text-green-600"
              }`}
            >
              {getStatesDisplayText()}
            </span>
          </div>
        </StatesSelectionModal>
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
              className="w-full mt-2"
            />
          </div>

          {/* Prize Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <Select
              value={data.prizeType}
              onValueChange={(value) => handleInputChange("prizeType", value)}
            >
              <SelectTrigger className="w-full mt-2 py-[22px]">
                <SelectValue placeholder="Select The Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Prize Pool */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Prize Pool</label>
          <Input
            type="number"
            placeholder="Enter prize pool amount"
            value={data.prizePool || ""}
            onChange={(e) => onUpdate({ prizePool: parseFloat(e.target.value) || 0 })}
            className="w-full mt-2"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          {data.prizeImage ? (
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-bg">
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src={URL.createObjectURL(data.prizeImage)}
                    alt="Prize preview"
                    width={46200}
                    height={46200}
                    className="w-full h-72 object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-green-600">
                    {data.prizeImage.name}
                  </p>
                  <div className="flex gap-2">
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
                        size="sm"
                        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Replace
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeImage}
                      className="bg-white border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-bg">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
