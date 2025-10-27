import ContainerLayout from "@/layout/ContainerLayout";
import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../ui/dialog";
import HowItWorksModalContent from "./HowItWorksModalContent";
import { apiRequest } from "@/helpers/apiRequest";

export async function Footer() {
  const links = await apiRequest("/settings?key=social", { method: "GET" });

  return (
    <footer className="bg-bg pt-10 border-t border-border-color">
      <ContainerLayout>
        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8 pr-20">
            {/* Left Section - Brand */}
            <div className="space-y-4">
              <div>
                <Image className="w-20" src={logo} alt="Lira" />
                <p className="text-[#4B524E] text-xs mt-4">
                  Predict. Play. Win.
                </p>
              </div>

              <div className="flex space-x-3">
                <Link
                  href={links?.data?.linkedin || "#"}
                  className="p-1 bg-dark-primary rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href={links?.data?.instagram || "#"}
                  className="p-1 bg-dark-primary rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </Link>
              </div>

              <p className="text-gray-text text-xs">{links?.data?.address}</p>
            </div>

            <div>
              {/* Middle Section - Product */}
              <h3 className="text-gray text-xs mb-5">Product</h3>
              <nav className="space-y-3">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-dark-primary text-sm font-bold cursor-pointer">
                        How it works
                      </button>
                    </DialogTrigger>
                    <HowItWorksModalContent />
                  </Dialog>
                </div>
                <Link
                  href="/faq"
                  className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="/about-us"
                  className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                >
                  About us
                </Link>
                <Link
                  href="/privacy-and-policy"
                  className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Section - Copyright and Disclaimer */}
          <div className="space-y-4 border-t border-border-color py-8">
            <p className="text-gray text-xs text-center">
              © 2025 Lira Inc. All rights reserved.
            </p>
          </div>
        </div>
      </ContainerLayout>
    </footer>
  );
}
