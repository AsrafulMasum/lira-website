import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import ContainerLayout from "@/layout/ContainerLayout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-[#FAFFFC]">
      <ContainerLayout>
        <nav className="w-full h-16 flex justify-between items-center">
          <Image className="w-16" src={logo} alt="Logo" />
          <div className="flex justify-center items-center gap-10">
            <ul className="hidden md:flex justify-center items-center gap-12">
              <li>
                <Link
                  href="/community"
                  className="text-[#004721] text-sm font-bold"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[#004721] text-sm font-bold"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/my-entries"
                  className="text-[#004721] text-sm font-bold"
                >
                  My Entries
                </Link>
              </li>
            </ul>
            
            <button className="flex justify-center items-center gap-2 bg-[#F2F7F5] rounded-full py-1 pl-1 pr-3 border border-[#E6EBE8] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
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
              Name
              <ChevronRight />
            </button>
          </div>
        </nav>
      </ContainerLayout>
    </div>
  );
};

export default Navbar;
