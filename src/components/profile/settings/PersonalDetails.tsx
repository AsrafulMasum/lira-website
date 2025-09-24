"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    contact: "",
    address: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm text-gray font-normal">
          Full name
        </Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="w-full px-3 py-2 border border-border-color rounded-md bg-white focus:outline-none placeholder:text-sm placeholder:text-gray-text text-gray-text"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm text-gray font-normal">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          disabled
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-border-color rounded-md bg-white focus:outline-none placeholder:text-sm placeholder:text-gray-text text-gray-text"
        />
        <p className="text-xs text-gray mt-1">
          To update your email, contact support.
        </p>
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Label htmlFor="contact" className="text-sm text-gray font-normal">
          Phone Number
        </Label>
        <Input
          id="contact"
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange("contact", e.target.value)}
          placeholder="Start typing"
          className="w-full px-3 py-2 border border-border-color rounded-md bg-white focus:outline-none placeholder:text-sm placeholder:text-gray-text text-gray-text"
        />
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm text-gray font-normal">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Start typing"
          className="w-full px-3 py-2 border border-border-color rounded-md bg-white focus:outline-none placeholder:text-sm placeholder:text-gray-text text-gray-text"
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
