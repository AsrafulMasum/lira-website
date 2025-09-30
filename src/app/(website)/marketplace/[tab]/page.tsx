import CryptoContent from "@/components/website/marketplace/tabGroupContents/CryptoContent";
import { apiRequest } from "@/helpers/apiRequest";

type PageProps = {
  params: Promise<{ tab: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function TabPage({ params, searchParams }: PageProps) {
  const { tab } = await params;

  const { data: tabs } = await apiRequest(`/categories/?groupId=${tab}`, {
    method: "GET",
  });

  return <CryptoContent tabs={tabs} searchParams={searchParams} />;
}
