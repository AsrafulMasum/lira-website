"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Menu,
  X,
  LogOut,
  BarChart3,
  Home,
  ChartLine,
  HelpCircle,
  ClipboardList,
  NotebookTabs,
  MailQuestionMark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <ChartLine className="h-5 w-5" />,
    },
    {
      name: "Organize Contests",
      href: "/dashboard/organize",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/dashboard/all-users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Price Types & Units",
      href: "/dashboard/types-units",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Terms & Conditions",
      href: "/dashboard/manageTerms",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      name: "Privacy Policy",
      href: "/dashboard/managePrivacy",
      icon: <NotebookTabs className="h-5 w-5" />,
    },
    {
      name: "Get Help",
      href: "/dashboard/get-help",
      icon: <MailQuestionMark className="h-5 w-5" />,
    },
    {
      name: "FAQ",
      href: "/dashboard/manageFaq",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileSidebar}
          className="rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-200 shadow-sm",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-[12px] border-b">
            <Link href="/dashboard" className="flex items-center">
              {!isCollapsed && (
                <span className="text-xl font-semibold text-gray-900">
                  Lira
                </span>
              )}
              {isCollapsed && <span className="text-xl font-bold">L</span>}
            </Link>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden lg:flex"
              >
                {isCollapsed ? (
                  <Menu className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSidebar}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-100",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex flex-col gap-2">
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full flex items-center cursor-pointer p-3 text-gray-700 hover:bg-gray-100 rounded-lg",
                  isCollapsed && "justify-center"
                )}
              >
                <Link href="/">
                  <Home className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-3">Home</span>}
                </Link>
              </Button>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className={cn(
                  "w-full flex items-center cursor-pointer p-3 text-gray-700 hover:bg-gray-100 rounded-lg",
                  isCollapsed && "justify-center"
                )}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
