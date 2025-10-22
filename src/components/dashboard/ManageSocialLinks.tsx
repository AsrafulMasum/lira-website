"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Save,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useAddSettingsMutation, useGetSettingsQuery } from "@/redux/apiSlices/publicSlice";
import Loading from "@/app/loading";

interface SocialLinksData {
  contactEmail: string;
  phone: string;
  address: string;
  instagram: string;
  linkedin: string;
}

const ManageSocialLinks = () => {
  const [formData, setFormData] = useState<SocialLinksData>({
    contactEmail: "",
    phone: "",
    address: "",
    instagram: "",
    linkedin: "",
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { data: getSettings, isLoading: isLoadingSettings } =
    useGetSettingsQuery("social");

    const [updateSocialLink, { isLoading: isUpdating }] = useAddSettingsMutation();

  const socialLinks = getSettings?.data;
  console.log(socialLinks);

  // Initialize form data with API data when available
  useEffect(() => {
    if (socialLinks) {
      setFormData({
        contactEmail: socialLinks.contactEmail || "",
        phone: socialLinks.phone || "",
        address: socialLinks.address || "",
        instagram: socialLinks.instagram || "",
        linkedin: socialLinks.linkedin || "",
      });
      setHasUnsavedChanges(false);
    }
  }, [socialLinks]);

  if (isLoadingSettings)
    return (
      <div>
        <Loading />
      </div>
    );

  // Handle input changes
  const handleInputChange = (field: keyof SocialLinksData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  // Handle form submission
  const handleSave = async () => {
    // Validate form data
    if (!isValidEmail(formData.contactEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isValidUrl(formData.instagram)) {
      toast.error("Please enter a valid Instagram URL");
      return;
    }

    if (!isValidUrl(formData.linkedin)) {
      toast.error("Please enter a valid LinkedIn URL");
      return;
    }

    try {
      // Format data according to API requirements
      const payload = {
        social: {
          contactEmail: formData.contactEmail,
          phone: formData.phone,
          address: formData.address,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
        },
      };

      const result = await updateSocialLink(payload).unwrap();
      
      if (result?.success) {
        toast.success("Social links updated successfully!");
        setHasUnsavedChanges(false);
      } else {
        toast.error(result?.message || "Failed to update social links");
      }
    } catch (error: any) {
      console.error("Error saving social links:", error);
      toast.error(error?.data?.message || "Failed to save social links. Please try again.");
    }
  };

  // Reset form
  const handleReset = () => {
    if (socialLinks) {
      setFormData({
        contactEmail: socialLinks.contactEmail || "",
        phone: socialLinks.phone || "",
        address: socialLinks.address || "",
        instagram: socialLinks.instagram || "",
        linkedin: socialLinks.linkedin || "",
      });
    } else {
      setFormData({
        contactEmail: "",
        phone: "",
        address: "",
        instagram: "",
        linkedin: "",
      });
    }
    setHasUnsavedChanges(false);
    toast.info("Form reset to original values");
  };

  // Validate URL format
  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty is valid
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    if (!email) return true; // Empty is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-8 h-8 text-green-600" />
              Manage Social Links
            </h1>
            <p className="text-gray-600 mt-2">
              Update your website&apos;s contact information and social media
              links.
            </p>
          </div>
          {hasUnsavedChanges && (
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              Unsaved Changes
            </Badge>
          )}
        </div>
      </div>

      {/* Main Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Contact Email */}
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@example.com"
                value={formData.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
                className={
                  !isValidEmail(formData.contactEmail) ? "border-red-300" : ""
                }
              />
              {formData.contactEmail &&
                !isValidEmail(formData.contactEmail) && (
                  <p className="text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="123 Main Street, City, State, ZIP Code"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Instagram */}
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram URL
              </Label>
              <div className="relative">
                <Input
                  id="instagram"
                  type="url"
                  placeholder="https://instagram.com/username"
                  value={formData.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  className={
                    !isValidUrl(formData.instagram) ? "border-red-300" : ""
                  }
                />
                {formData.instagram && isValidUrl(formData.instagram) && (
                  <a
                    href={formData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              {formData.instagram && !isValidUrl(formData.instagram) && (
                <p className="text-sm text-red-600">Please enter a valid URL</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn URL
              </Label>
              <div className="relative">
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/company/name"
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  className={
                    !isValidUrl(formData.linkedin) ? "border-red-300" : ""
                  }
                />
                {formData.linkedin && isValidUrl(formData.linkedin) && (
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              {formData.linkedin && !isValidUrl(formData.linkedin) && (
                <p className="text-sm text-red-600">Please enter a valid URL</p>
              )}
            </div>

            {/* Preview Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
              <div className="space-y-2 text-sm">
                {formData.contactEmail && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-3 h-3" />
                    {formData.contactEmail}
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-3 h-3" />
                    {formData.phone}
                  </div>
                )}
                {formData.address && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {formData.address}
                  </div>
                )}
                {formData.instagram && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Instagram className="w-3 h-3" />
                    Instagram
                  </div>
                )}
                {formData.linkedin && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </div>
                )}
                {!formData.contactEmail &&
                  !formData.phone &&
                  !formData.address &&
                  !formData.instagram &&
                  !formData.linkedin && (
                    <p className="text-gray-400 italic">
                      No information added yet
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </Button>

        <Button
          onClick={handleSave}
          disabled={isUpdating || !hasUnsavedChanges}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {isUpdating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Tips:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>
            • All fields are optional - fill in only what you want to display
          </li>
          <li>• Social media URLs should include the full URL (https://...)</li>
          <li>
            • Use the preview section to see how your information will appear
          </li>
          <li>• Click the external link icon to test your social media URLs</li>
        </ul>
      </div>
    </div>
  );
};

export default ManageSocialLinks;
