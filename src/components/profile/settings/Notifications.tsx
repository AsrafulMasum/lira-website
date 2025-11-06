"use client";

import { Switch } from "@/components/ui/switch";
import React, { useState, useEffect } from "react";
import { apiRequest } from "@/helpers/apiRequest";
import { toast } from "sonner";

const Notifications = ({ notificationData }: any) => {
  const [notifications, setNotifications] = useState({
    newContests: true,
    contestReminder: false,
    weeklySummary: false,
  });

  // Set initial state from notificationData
  useEffect(() => {
    if (notificationData) {
      setNotifications({
        newContests: notificationData.constants,
        contestReminder: notificationData.reminder,
        weeklySummary: notificationData.summary,
      });
    }
  }, [notificationData]);

  const handleNotificationToggle = async (field: string, value: boolean) => {
    // Update local state first
    const updated = { ...notifications, [field]: value };
    setNotifications(updated);

    // Call API outside setState to avoid double triggers
    try {
      const response = await apiRequest("/notifications/user-preferences", {
        method: "PATCH",
        body: {
          constants: updated.newContests,
          reminder: updated.contestReminder,
          summary: updated.weeklySummary,
        },
      });

      if (response.success) {
        toast.success("Preferences updated successfully!");
      } else {
        console.error("Failed to update preferences:", response.message);
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between py-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#002913]">
            New contests added
          </h3>
          <p className="text-xs font-normal text-gray-text">
            Get notified when new contests are available
          </p>
        </div>
        <Switch
          className="cursor-pointer"
          checked={notifications.newContests}
          onCheckedChange={(checked) =>
            handleNotificationToggle("newContests", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#002913]">
            Reminder 1 day before contest ends
          </h3>
          <p className="text-xs font-normal text-gray-text">
            Get reminded before your contests close
          </p>
        </div>
        <Switch
          className="cursor-pointer"
          checked={notifications.contestReminder}
          onCheckedChange={(checked) =>
            handleNotificationToggle("contestReminder", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#002913]">
            Weekly summary of entries and results
          </h3>
          <p className="text-xs font-normal text-gray-text">
            Weekly digest of your contest activity
          </p>
        </div>
        <Switch
          className="cursor-pointer"
          checked={notifications.weeklySummary}
          onCheckedChange={(checked) =>
            handleNotificationToggle("weeklySummary", checked)
          }
        />
      </div>
    </div>
  );
};

export default Notifications;
