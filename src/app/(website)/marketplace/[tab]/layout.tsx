import Link from "next/link";
import ContainerLayout from "@/layout/ContainerLayout";
import React, { ReactNode } from "react";
import { apiRequest } from "@/helpers/apiRequest";

const tabs = [
  { key: "all", label: "All" },
  { key: "crypto", label: "Crypto Market" },
  { key: "weather", label: "Weather" },
  { key: "stock", label: "Stock Market" },
];

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ tab?: string }>; // 👈 params is async
}

type Group = {
  _id: string;
  name: string;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { data: groups } = await apiRequest("/groups", { method: "GET" });
  const resolvedParams = await params;
  const activeTab = resolvedParams.tab ?? groups[0]?._id;

  return (
    <section>
      {/* Tabs */}
      <div className="bg-[#FAFFFC] pt-5">
        <ContainerLayout>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {groups?.map((tab: Group) => (
              <Link
                key={tab?._id}
                href={`/marketplace/${tab?._id}`}
                className={`pb-2 text-base font-bold border-b-2 transition-colors text-nowrap ${
                  activeTab === tab?._id
                    ? "border-dark-primary text-dark-primary"
                    : "border-transparent text-gray hover:text-gray"
                }`}
              >
                {tab?.name}
              </Link>
            ))}
          </div>
        </ContainerLayout>
      </div>

      {/* Page content */}
      <div>{children}</div>
    </section>
  );
}
