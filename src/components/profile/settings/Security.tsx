"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";
import { revalidateTags } from "@/helpers/revalidateTags";
import Image from "next/image";

interface ImagePreview {
  id: string;
  file: File;
  preview: string;
}

const Security = ({ profile }: any) => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview: ImagePreview = {
            id: `${Date.now()}-${Math.random()}`,
            file,
            preview: e.target?.result as string,
          };
          setImages((prev) => [...prev, preview]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary", "bg-primary/5");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary", "bg-primary/5");

    const files = e.dataTransfer.files;
    if (files) {
      const event = {
        currentTarget: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  const onSave = async () => {
    if (images.length === 0) {
      toast.warning("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img.file));
    toast.loading("Uploading documents...");

    const res = await apiRequest("/users/upload-identity", {
      method: "PATCH",
      body: formData,
    });
    console.log(res);
    toast.dismiss();

    if (res?.success) {
      toast.success(res?.message || "Documents uploaded successfully.");
      setImages([]);
      revalidateTags(["user-profile"]);
    } else {
      toast.error(res?.message || "Upload failed. Please try again.");
    }
  };

  // useEffect(() => {
  //   if (profile?.images) {
  //     const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "";
  //     const initial = profile.images.map((img: any) => {
  //       const id = img.id || `${Date.now()}-${Math.random()}`;
  //       const preview =
  //         typeof img === "object" ? `${baseUrl}${img.url}` : `${baseUrl}${img}`;
  //       const name =
  //         typeof img === "object"
  //           ? img.name || "image"
  //           : (img as string).split("/").pop() || "image";
  //       return { id, file: new File([], name), preview };
  //     });
  //     setImages(initial);
  //   }
  // }, [profile?.images]);

  return (
    <div className="space-y-6 py-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Security Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your security preferences and upload verification documents
        </p>
      </div>

      {/* File Upload Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload multiple images for verification. Supported formats: JPG,
            PNG, GIF, WebP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="relative border-2 border-dashed border-border rounded-lg p-8 transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-primary/2.5"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload images"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3"
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, GIF, WebP up to 10MB each
                </p>
              </div>
            </div>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">
                  Uploaded Images ({images.length})
                </h3>
                {images.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setImages([])}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-200"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={image.preview || "/placeholder.svg"}
                      alt={image.file.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(image.id)}
                        className="text-white hover:bg-destructive/80 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* File Name Tooltip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {images.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                No images uploaded yet. Start by uploading your first image.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Security;
