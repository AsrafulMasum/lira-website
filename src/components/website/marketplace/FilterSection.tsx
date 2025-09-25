// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ContainerLayout from "@/layout/ContainerLayout";
// import React from "react";
// import CryptoContent from "./tabGroupContents/CryptoContent";

// const FilterSection = () => {
//   return (
//     <section className="bg-[#FAFFFC] min-h-[calc(100vh-64px)]">
//       <Tabs defaultValue="crypto" className="w-full h-12">
//         <ContainerLayout>
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="crypto">Crypto Market</TabsTrigger>
//             <TabsTrigger value="weather">Weather</TabsTrigger>
//             <TabsTrigger value="stock">Stock Market</TabsTrigger>
//           </TabsList>
//         </ContainerLayout>
//         <TabsContent value="all">
//           <CryptoContent />
//         </TabsContent>
//         <TabsContent value="crypto">
//           <CryptoContent />
//         </TabsContent>
//         <TabsContent value="weather">
//           <CryptoContent />
//         </TabsContent>
//         <TabsContent value="stock">
//           <CryptoContent />
//         </TabsContent>
//       </Tabs>
//     </section>
//   );
// };

// export default FilterSection;

import Link from "next/link";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import CryptoContent from "./tabGroupContents/CryptoContent";

interface FilterSectionProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const tabs = [
  { key: "all", label: "All" },
  { key: "crypto", label: "Crypto Market" },
  { key: "weather", label: "Weather" },
  { key: "stock", label: "Stock Market" },
];

const FilterSection = ({ searchParams = {} }: FilterSectionProps) => {
  const tabParam = searchParams.tab;
  const activeTab =
    (Array.isArray(tabParam) ? tabParam[0] : tabParam) ?? "crypto";

  return (
    <section className="bg-[#FAFFFC] min-h-[calc(100vh-64px)]">
      <ContainerLayout>
        {/* Tabs Navigation */}
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={`?tab=${tab.key}`}
              className={`pb-4 text-base font-bold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-dark-primary text-dark-primary"
                  : "border-transparent text-gray hover:text-gray"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </ContainerLayout>

      {/* Tab Contents */}
      <div>
        {activeTab === "all" && <CryptoContent />}
        {activeTab === "crypto" && <CryptoContent />}
        {activeTab === "weather" && <CryptoContent />}
        {activeTab === "stock" && <CryptoContent />}
      </div>
    </section>
  );
};

export default FilterSection;

