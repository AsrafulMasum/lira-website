import CryptoContent from "@/components/website/marketplace/tabGroupContents/CryptoContent";
import { apiRequest } from "@/helpers/apiRequest";

type PageProps = {
  params: Promise<{ tab: string }>;
  searchParams: Promise<{
    tab?: string;
    search?: string;
    sortBy?: string;
    prizeType?: string;
    prizeMin?: string;
    prizeMax?: string;
    entriesMin?: string;
    entriesMax?: string;
  }>;
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const { tab } = await params;
  const searchParamsValue = await searchParams;
  const searchTerm = searchParamsValue?.search || "";
  const sortBy = searchParamsValue?.sortBy || null;
  const prizeType = searchParamsValue?.prizeType || null;
  const prizeMin = searchParamsValue?.prizeMin || null;
  const prizeMax = searchParamsValue?.prizeMax || null;
  const entriesMin = searchParamsValue?.entriesMin || null;
  const entriesMax = searchParamsValue?.entriesMax || null;
  console.log(sortBy, prizeType, prizeMin, prizeMax, entriesMax, entriesMin);

  const { data: tabs } = await apiRequest(`/categories/?groupId=${tab}`, {
    method: "GET",
  });

  const activeTab = searchParamsValue?.tab ?? tabs[0]?._id;

  const { data } = await apiRequest(
    `/contest/active/list?${
      searchTerm ||
      sortBy ||
      prizeType ||
      prizeMin ||
      prizeMax ||
      entriesMin ||
      entriesMax
        ? `searchTerm=${searchTerm}&sort=${sortBy}&prizeType=${prizeType}&minPrice=${prizeMin}&maxPrice=${prizeMax}&minEntryPrice=${entriesMin}&maxEntryPrice=${entriesMax}`
        : `categoryId=${activeTab}`
    }`,
    {
      method: "GET",
    }
  );

  const tabName = tabs.find((tab: any) => tab._id === activeTab)?.name;

  return (
    <CryptoContent
      tabs={tabs}
      activeTab={activeTab}
      data={data}
      tabName={tabName}
    />
  );
}
