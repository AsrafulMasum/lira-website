import Link from "next/link";
import ContainerLayout from "@/layout/ContainerLayout";
import React, { ReactNode } from "react";

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

export default async function Layout({ children, params }: LayoutProps) {
  const resolvedParams = await params; // ✅ must await
  const activeTab = resolvedParams.tab ?? "crypto";

  return (
    <section>
      {/* Tabs */}
      <div className="bg-[#FAFFFC] pt-5">
        <ContainerLayout>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={`/${tab.key}`}
                className={`pb-4 text-base font-bold border-b-2 transition-colors text-nowrap ${
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
      </div>

      {/* Page content */}
      <div>{children}</div>
    </section>
  );
}
