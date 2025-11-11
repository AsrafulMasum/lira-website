"use client";

import Link from "next/link";
import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import HowItWorksModalContent from "./HowItWorksModalContent";

const NavLinks = ({ profile }: any) => {
  // const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Links */}
      <ul className="hidden md:flex justify-center items-center gap-12">
        <li>
          <Link
            href="/community"
            className="text-dark-primary text-sm font-bold"
          >
            Community
          </Link>
        </li>
        <li>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-dark-primary text-sm font-bold cursor-pointer">
                How it works
              </button>
            </DialogTrigger>
            <HowItWorksModalContent />
          </Dialog>
        </li>
        {profile?.role !== "SUPER_ADMIN" && (
          <li>
            <Link
              href="/my-entries"
              className="text-dark-primary text-sm font-bold"
            >
              My Entries
            </Link>
          </li>
        )}
        {profile?.role === "SUPER_ADMIN" && (
          <li>
            <Link
              href="/dashboard"
              className="text-[#004721] text-sm font-bold"
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Hamburger Icon */}
      {/* <button
        className="md:hidden text-dark-primary"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button> */}

      {/* Mobile Dropdown Menu */}
      {/* {menuOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-4 animate-slideDown z-50">
          <ul className="flex flex-col items-start gap-3 px-4">
            <li>
              <Link
                href="/community"
                className="block text-dark-primary text-sm font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Community
              </Link>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-dark-primary text-sm font-bold cursor-pointer"
                  >
                    How it works
                  </button>
                </DialogTrigger>
                <HowItWorksModalContent />
              </Dialog>
            </li>
            {profile?.role !== "SUPER_ADMIN" && (
              <li>
                <Link
                  href="/my-entries"
                  className="block text-dark-primary text-sm font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  My Entries
                </Link>
              </li>
            )}
            {profile?.role === "SUPER_ADMIN" && (
              <li>
                <Link
                  href="/dashboard"
                  className="block text-[#004721] text-sm font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default NavLinks;
