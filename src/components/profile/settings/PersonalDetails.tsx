"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Check } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/helpers/apiRequest";
import { useEffect, useState } from "react";

const PersonalDetails = ({ profile }: any) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageHover, setImageHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Set default values from profile when available
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.name || "",
        email: profile.email || "",
        contact: profile.phone || "",
        address: profile.address || "",
        image:
          `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile.image}` || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: formData.fullName,
      phone: formData.contact,
      address: formData.address,
    };

    try {
      const formDataToSend = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const result = await apiRequest("/users/profile", {
        method: "PATCH",
        body: formDataToSend,
      });

      if (result.success) {
        toast.success(result.message || "Profile updated successfully!");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("[v0] Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="rounded-lg p-8 border border-neutral-200">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="image"
              className="text-sm font-semibold text-neutral-900"
            >
              Profile Picture
            </Label>
            <p className="text-xs text-neutral-500 mt-1">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Image Preview */}
            <div
              className="relative"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary-light to-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-1" />
                    <span className="text-xs text-neutral-400">Add photo</span>
                  </div>
                )}
              </div>
              {imageHover && formData.image && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer">
                  <Upload className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Upload Input */}
            <div className="flex-1">
              <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary-light/30 transition-colors">
                <div className="text-center">
                  <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                  <span className="text-sm font-medium text-neutral-700">
                    Click to upload
                  </span>
                  <span className="text-xs text-neutral-500 block">
                    or drag and drop
                  </span>
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-8 border border-neutral-200 space-y-6">
        {/* Full Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm font-semibold text-neutral-900"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-900"
          >
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              disabled
              value={formData.email}
              className="bg-neutral-50 text-neutral-600 cursor-not-allowed"
            />
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">
            Contact support to change your email address
          </p>
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <Label
            htmlFor="contact"
            className="text-sm font-semibold text-neutral-900"
          >
            Phone Number
          </Label>
          <Input
            id="contact"
            type="text"
            value={formData.contact}
            onChange={(e) => handleInputChange("contact", e.target.value)}
          />
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-sm font-semibold text-neutral-900"
          >
            Address
          </Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
