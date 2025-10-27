"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CustomProvider from "@/lib/CustomProvider";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Force client-side rendering to ensure all components load properly
  useEffect(() => {
    // This ensures the component is fully mounted on the client side
    const loadScripts = async () => {
      // Dynamically import any required client-side libraries if needed
      if (typeof window !== "undefined") {
        // Client-side code
        document.body.classList.add("dashboard-loaded");
      }
    };

    loadScripts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCollapse={(collapsed) => setIsCollapsed(collapsed)} />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <header className="h-[61px] border-b bg-white flex items-center px-4">
          <h1 className="text-xl font-bold">Lira Dashboard</h1>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <CustomProvider>{children}</CustomProvider>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
