import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import PersonalDetails from "./PersonalDetails";
import Notifications from "./Notifications";
import Security from "./Security";
import Payments from "./Payments";
import getProfile from "@/helpers/getProfile";
import { apiRequest } from "@/helpers/apiRequest";
import Link from "next/link";

const Settings = async ({ notificationData }: any) => {
  const profile = await getProfile();

  const { data } = await apiRequest("/withdrawals/cards", {
    method: "GET",
    cache: "no-store",
    tags: ["cards"],
  });

  return (
    <div className="pt-10 min-h-[calc(100vh-64px)]">
      {/* Breadcrumb Navigation */}
      <div className="py-4">
        <div className="flex items-center gap-0.5 text-sm text-gray-600">
          <Link
            href="/profile"
            className="text-primary cursor-pointer hover:underline"
          >
            Profile
          </Link>
          <ChevronRight className="size-4 text-primary" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-dark-primary text-3xl font-semibold">
            Settings
          </span>
        </div>
      </div>

      <div className="py-6">
        <Tabs defaultValue="personal" className="w-full">
          <div className="border-b border-border-color mb-12">
            <TabsList className="flex w-full bg-transparent rounded-none h-auto p-0">
              <TabsTrigger
                value="personal"
                className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
              >
                Payments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal">
            <PersonalDetails profile={profile} />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications notificationData={notificationData} />
          </TabsContent>

          <TabsContent value="security">
            <Security profile={profile} />
          </TabsContent>

          <TabsContent value="payments">
            <Payments cards={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
