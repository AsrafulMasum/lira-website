"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import { ChevronRight } from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "payments", label: "Payments" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    newContests: true,
    contestReminder: false,
    weeklySummary: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationToggle = (field: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="pt-10 min-h-[calc(100vh-64px)]">
      {/* Breadcrumb Navigation */}
      <div className="py-4">
        <div className="flex items-center gap-0.5 text-sm text-gray-600">
          <span className="text-primary cursor-pointer hover:underline">
            Profile
          </span>
          <ChevronRight className="size-4 text-primary" />
        </div>
        <span className="text-dark-primary text-3xl font-semibold">
          Settings
        </span>
      </div>

      <div className="py-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-12">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 text-base font-semibold cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? "border-dark-primary text-dark-primary font-bold"
                    : "border-transparent text-gray hover:text-gray hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        {activeTab === "personal" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm text-gray"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 py-2 border border-border-color rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm text-gray"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-border-color rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray mt-1">
                To update your email, contact support.
              </p>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm text-gray"
              >
                Address
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Start typing"
                className="w-full px-3 py-2 border border-border-color rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between py-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  New contests added
                </h3>
                <p className="text-sm text-gray-500">
                  Get notified when new contests are available
                </p>
              </div>
              <Switch
                checked={notifications.newContests}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("newContests", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  Reminder 1 day before contest ends
                </h3>
                <p className="text-sm text-gray-500">
                  Get reminded before your contests close
                </p>
              </div>
              <Switch
                checked={notifications.contestReminder}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("contestReminder", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  Weekly summary of entries and results
                </h3>
                <p className="text-sm text-gray-500">
                  Weekly digest of your contest activity
                </p>
              </div>
              <Switch
                checked={notifications.weeklySummary}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("weeklySummary", checked)
                }
              />
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4 text-center py-8">
            <p className="text-lg font-medium text-gray-900">
              No change or reset password is needed
            </p>
            <p className="text-lg text-gray-700">
              Here we should add the two factor auth after mvp
            </p>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
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

            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  Visa ending in 4204
                </h3>
                <p className="text-sm text-gray-500">
                  Secondary payment method
                </p>
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
              className="w-full mt-6 text-primary hover:text-primary border-border-color hover:bg-transparent cursor-pointer bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a debit/credit card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
