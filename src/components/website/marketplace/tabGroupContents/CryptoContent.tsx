"use client";

import ContainerLayout from "@/layout/ContainerLayout";
import { ListFilter } from "lucide-react";
import Contests from "../filterTabsContent/Contests";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterSheet from "../sheets/FilterSheet";
import SearchInput from "./SearchInput";
import CategoryTabs from "./CategoryTabs";
import { useState } from "react";

interface Tab {
  _id: string;
  name: string;
}

interface CryptoContentProps {
  tabs: Tab[];
  activeTab: string;
  data: any;
  tabName: string | undefined;
}

const CryptoContent: React.FC<CryptoContentProps> = ({
  tabs,
  activeTab,
  data,
  tabName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDone = () => {
    setIsOpen(false);
  };
  return (
    <section className="bg-bg min-h-[calc(100vh-112px)] py-10">
      <ContainerLayout>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-auto flex items-center gap-4 lg:border-r lg:pr-6">
            <SearchInput />

            <div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="flex justify-center items-center gap-2 bg-[#FAFFFC] w-12 h-12 text-sm font-medium text-primary rounded-2xl border border-border-color cursor-pointer">
                    <ListFilter className="size-4" />
                  </button>
                </SheetTrigger>
                <FilterSheet range={data?.range} setIsOpen={setIsOpen} />
              </Sheet>
            </div>
          </div>

          <CategoryTabs tabs={tabs} activeTab={activeTab} />
        </div>

        {/* Tab Content */}
        <div className="">
          <Contests data={data} category={tabName ?? ""} />
        </div>
      </ContainerLayout>
    </section>
  );
};

export default CryptoContent;
