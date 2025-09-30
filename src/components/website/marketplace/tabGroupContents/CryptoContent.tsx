import ContainerLayout from "@/layout/ContainerLayout";
import { ListFilter } from "lucide-react";
import Contests from "../filterTabsContent/Contests";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterSheet from "../sheets/FilterSheet";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { apiRequest } from "@/helpers/apiRequest";

interface Tab {
  _id: string;
  name: string;
}

interface CryptoContentProps {
  tabs: Tab[];
  searchParams: any;
}

const CryptoContent: React.FC<CryptoContentProps> = async ({
  tabs,
  searchParams,
}) => {
  const sp = await searchParams;
  const activeTab = sp?.tab ?? tabs[0]?._id;
  const searchValue = sp.search || "";
  const { data } = await apiRequest(
    `/contest/active/list?categoryId=${activeTab}`,
    {
      method: "GET",
    }
  );
  const tabName = tabs.find((tab) => tab._id === activeTab)?.name;

  return (
    <section className="bg-bg min-h-[calc(100vh-112px)] py-10">
      <ContainerLayout>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-auto flex items-center gap-4 lg:border-r lg:pr-6">
            <SearchInput initialValue={searchValue} />

            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex justify-center items-center gap-2 bg-[#FAFFFC] w-12 h-12 text-sm font-medium text-primary rounded-2xl border border-border-color cursor-pointer">
                    <ListFilter className="size-4" />
                  </button>
                </SheetTrigger>
                <FilterSheet />
              </Sheet>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide">
            {tabs?.map((tab) => (
              <Link
                key={tab?._id}
                href={`?tab=${tab?._id}`}
                className={`px-4 font-bold cursor-pointer h-10 lg:h-12 border rounded-2xl transition text-nowrap flex items-center
                  ${
                    activeTab === tab?._id
                      ? "text-primary border-primary"
                      : "text-neutral-500"
                  }
                `}
              >
                {tab?.name}
              </Link>
            ))}
          </div>
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
