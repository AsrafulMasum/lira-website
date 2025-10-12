import CryptoContent from "@/components/website/marketplace/tabGroupContents/CryptoContent";
import { apiRequest } from "@/helpers/apiRequest";

type PageProps = {
  params: Promise<{ tab: string }>;
  searchParams: Promise<{ tab?: string; search?: string }>;
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const { tab } = await params;
  const searchParamsValue = await searchParams;
  const searchTerm = searchParamsValue?.search || "";

  const { data: tabs } = await apiRequest(`/categories/?groupId=${tab}`, {
    method: "GET",
  });

  const activeTab = searchParamsValue?.tab ?? tabs[0]?._id;
  const { data } = await apiRequest(
    `/contest/active/list?categoryId=${activeTab}`,
    {
      method: "GET",
    }
  );
  const tabName = tabs.find((tab: any) => tab._id === activeTab)?.name;
  console.log(searchTerm);

  return (
    <CryptoContent
      tabs={tabs}
      activeTab={activeTab}
      data={data}
      tabName={tabName}
    />
  );
}
