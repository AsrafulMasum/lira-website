// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
// import PersonalDetails from "./PersonalDetails";
// import Notifications from "./Notifications";
// import Security from "./Security";
// import Payments from "./Payments";

// const tabs = [
//   { id: "personal", label: "Personal" },
//   { id: "notifications", label: "Notifications" },
//   { id: "security", label: "Security" },
//   { id: "payments", label: "Payments" },
// ];

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("personal");

//   return (
//     <div className="pt-10 min-h-[calc(100vh-64px)]">
//       {/* Breadcrumb Navigation */}
//       <div className="py-4">
//         <div className="flex items-center gap-0.5 text-sm text-gray-600">
//           <span className="text-primary cursor-pointer hover:underline">
//             Profile
//           </span>
//           <ChevronRight className="size-4 text-primary" />
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-dark-primary text-3xl font-semibold">
//             Settings
//           </span>
//           <Button className="bg-dark-primary h-12 px-4 text-sm font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-xl cursor-pointer">
//             Save Changes
//           </Button>
//         </div>
//       </div>

//       <div className="py-6">
//         {/* Tab Navigation */}
//         <div className="border-b border-gray-200 mb-12">
//           <nav className="flex space-x-8">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-2 px-1 border-b-2 text-base font-semibold cursor-pointer transition-colors ${
//                   activeTab === tab.id
//                     ? "border-dark-primary text-dark-primary font-bold"
//                     : "border-transparent text-gray hover:text-gray hover:border-gray-300"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Form Content */}
//         {activeTab === "personal" && <PersonalDetails />}

//         {activeTab === "notifications" && <Notifications />}

//         {activeTab === "security" && <Security />}

//         {activeTab === "payments" && <Payments />}
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import PersonalDetails from "./PersonalDetails";
import Notifications from "./Notifications";
import Security from "./Security";
import Payments from "./Payments";

const Settings = () => {
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
        <div className="flex justify-between items-center">
          <span className="text-dark-primary text-3xl font-semibold">
            Settings
          </span>
          <Button className="bg-dark-primary h-12 px-4 text-sm font-bold hover:bg-dark-primary/90 text-primary-foreground rounded-xl cursor-pointer">
            Save Changes
          </Button>
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
            <PersonalDetails />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>

          <TabsContent value="security">
            <Security />
          </TabsContent>

          <TabsContent value="payments">
            <Payments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
