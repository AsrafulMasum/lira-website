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

  const { data: tabs } = await apiRequest(`/categories/?groupId=${tab}`, {
    method: "GET",
  });

  const activeTab = searchParamsValue?.tab ?? tabs[0]?._id;

  const queryParams = new URLSearchParams();

  // add only params that actually have values
  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (sortBy) queryParams.append("sort", sortBy);
  if (prizeType && prizeType !== "All")
    queryParams.append("prizeType", prizeType);
  if (prizeMin) queryParams.append("minPrice", prizeMin);
  if (prizeMax) queryParams.append("maxPrice", prizeMax);
  if (entriesMin) queryParams.append("minEntryPrice", entriesMin);
  if (entriesMax) queryParams.append("maxEntryPrice", entriesMax);

  // if no filters applied, use categoryId instead
  const hasFilters = [
    searchTerm,
    sortBy,
    prizeType && prizeType !== "All",
    prizeMin,
    prizeMax,
    entriesMin,
    entriesMax,
  ].some(Boolean);

  if (!hasFilters && activeTab !== "All") {
    queryParams.append("categoryId", activeTab);
  }

  const { data } = await apiRequest(
    `/contest/active/list?${queryParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
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
