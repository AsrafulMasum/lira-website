import CryptoContent from "@/components/website/marketplace/tabGroupContents/CryptoContent";
import React from "react";

type PageProps = {
  params: Promise<{ tab: string }>
};

export default async function TabPage({ params }: PageProps) {
  const { tab } = await params;

  switch (tab) {
    case "all":
      return <CryptoContent />;
    case "crypto":
      return <CryptoContent />;
    case "weather":
      return <CryptoContent />;
    case "stock":
      return <CryptoContent />;
    default:
      return <CryptoContent />;
  }
}
