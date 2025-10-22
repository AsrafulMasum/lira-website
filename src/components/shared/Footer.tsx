import ContainerLayout from "@/layout/ContainerLayout";
import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Dialog, DialogTrigger } from "../ui/dialog";
import HowItWorksModalContent from "./HowItWorksModalContent";

export function Footer() {
  return (
    <footer className="bg-bg py-11 border-t border-border-color">
      <ContainerLayout>
        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8 pr-20">
            {/* Left Section - Brand */}
            <div className="space-y-4">
              <div>
                <Image className="w-12" src={logo} alt="Lira" />
                <p className="text-[#4B524E] text-xs mt-4">
                  Predict. Play. Win.
                </p>
              </div>

              <div className="flex space-x-3">
                <Link
                  href="#"
                  className="p-1 bg-dark-primary rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-1 bg-dark-primary rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </Link>
              </div>

              <p className="text-gray-text text-xs">Boston, MA, USA</p>
            </div>

            <div className="flex justify-between lg:gap-28">
              {/* Middle Section - Product */}
              <div>
                <h3 className="text-gray text-xs mb-5">Product</h3>
                <nav className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-dark-primary text-sm font-bold cursor-pointer">
                        How it works
                      </button>
                    </DialogTrigger>
                    <HowItWorksModalContent />
                  </Dialog>
                  <Link
                    href="/faq"
                    className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="#"
                    className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                  >
                    Regulatory
                  </Link>
                  <Link
                    href="#"
                    className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                  >
                    Trading Prohibitions
                  </Link>
                </nav>
              </div>

              {/* Right Section - Company */}
              <div>
                <h3 className="text-gray text-xs mb-5">Company</h3>
                <nav className="space-y-3">
                  <Link
                    href="#"
                    className="block text-sm font-bold text-dark-primary hover:text-primary transition-colors"
                  >
                    Carrers
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
          </div>

          {/* Bottom Section - Copyright and Disclaimer */}
          <div className="space-y-4">
            <p className="text-gray text-xs">© Lira Inc. - 2025</p>

            <p className="text-gray-text text-xs leading-relaxed">
              Trading on Lira involves risk and may not be appropriate for all.
              Members risk losing their cost to enter any transaction, including
              fees. You should carefully consider whether trading on Lira is
              appropriate for you in light of your investment experience and
              financial resources. Information is provided for convenience only
              and &#34;AS IS&#34; basis. Past performance is not necessarily
              indicative of future results. Lira is subject to U.S. regulatory
              oversight by the CFTC.
            </p>
          </div>
        </div>
      </ContainerLayout>
    </footer>
  );
}
