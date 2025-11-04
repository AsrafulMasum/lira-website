import Link from "next/link";
import ContainerLayout from "@/layout/ContainerLayout";
import React, { ReactNode } from "react";
import { apiRequest } from "@/helpers/apiRequest";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ tab?: string }>;
}

type Group = {
  _id: string;
  name: string;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { data: groups } = await apiRequest("/groups", { method: "GET" });
  const resolvedParams = await params;
  // const activeTab = resolvedParams.tab ?? groups[0]?._id;
  const hasGroups = Array.isArray(groups) && groups.length > 0;
  const activeTab = resolvedParams.tab ?? (hasGroups ? groups[0]._id : "All");

  return (
    <section>
      {/* Tabs */}
      <div className="bg-[#FAFFFC] pt-5">
        <ContainerLayout>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            <Link
              href={`/marketplace/All`}
              className={`pb-2 text-base font-bold border-b-2 transition-colors text-nowrap
                  ${
                    activeTab === "All"
                      ? "border-dark-primary text-dark-primary"
                      : "border-transparent text-gray hover:text-gray"
                  }
                `}
            >
              All
            </Link>
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
