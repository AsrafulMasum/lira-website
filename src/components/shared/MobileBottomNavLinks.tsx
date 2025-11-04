"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Users, LogIn, HelpCircle, BarChart3, UserPlus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import HowItWorksModalContent from "./HowItWorksModalContent";

const MobileBottomNav = ({ profile }: any) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/community",
      label: "Community",
      icon: Users,
      show: profile,
      isDialog: false,
    },
    {
      href: "/login",
      label: "Login",
      icon: LogIn,
      show: !profile,
      isDialog: false,
    },
    {
      href: "/sign-up",
      label: "Sign Up",
      icon: UserPlus,
      show: !profile,
      isDialog: false,
    },
    {
      href: "/my-entries",
      label: "My Entries",
      icon: BarChart3,
      show: profile && profile?.role !== "SUPER_ADMIN",
      isDialog: false,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      show: profile && profile?.role === "SUPER_ADMIN",
      isDialog: false,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => {
          if (!item.show) return null;
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-3 relative transition-colors"
            >
              {active && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-600" />
              )}
              <Icon
                size={24}
                className={`${
                  active ? "text-green-600" : "text-gray-400"
                } mb-1`}
              />
              <span
                className={`text-xs font-medium ${
                  active ? "text-green-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center justify-center flex-1 py-3 relative transition-colors text-gray-400 hover:text-gray-600">
              <HelpCircle size={24} className="mb-1" />
              <span className="text-xs font-medium">How it works</span>
            </button>
          </DialogTrigger>
          <HowItWorksModalContent />
        </Dialog>
        {profile && profile?.role !== "SUPER_ADMIN" && (
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center flex-1 py-3 relative transition-colors"
          >
            {isActive("/profile") && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-600" />
            )}
            <div
              className={`rounded-full p-0.5 mb-1 ${
                isActive("/profile") ? "text-green-600" : "text-gray-400"
              }`}
            >
              {profile?.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile?.image}`}
                  alt="Profile Picture"
                  width={24}
                  height={24}
                  className="rounded-full object-cover w-6 h-6"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="w-6 h-6"
                >
                  <rect
                    width="36"
                    height="36"
                    rx="18"
                    fill="url(#paint0_linear_363_1580)"
                  />
                  <path
                    d="M18.74 17.9607C29.754 15.0074 26.6383 9.61364 18.5776 17.6786C26.6426 9.61364 21.2446 6.5022 18.2955 17.5162C21.2488 6.5022 15.0174 6.5022 17.9664 17.5162C15.0131 6.49793 9.61942 9.61364 17.6801 17.6743C9.61942 9.61364 6.50371 15.0074 17.5177 17.9607C6.50371 15.0074 6.50371 21.2388 17.5177 18.2898C6.50371 21.2431 9.61942 26.6368 17.6801 18.5718C9.61515 26.6368 15.0131 29.7482 17.9622 18.7343C15.0089 29.7482 21.2403 29.7482 18.2913 18.7343C21.2446 29.7482 26.6383 26.6325 18.5733 18.5718C26.6383 26.6368 29.7497 21.2388 18.7358 18.2898C29.754 21.2388 29.754 15.0074 18.74 17.9607Z"
                    fill="#E6EBE8"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_363_1580"
                      x1="18"
                      y1="0"
                      x2="18"
                      y2="36"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#007A39" />
                      <stop offset="1" stopColor="#004721" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/profile") ? "text-green-600" : "text-gray-500"
              }`}
            >
              {profile?.name?.split(" ")[0]}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
