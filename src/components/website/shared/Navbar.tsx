import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import ContainerLayout from "@/layout/ContainerLayout";

const Navbar = () => {
  return (
    <div className="bg-[#FAFFFC]">
      <ContainerLayout>
        <nav className="w-full h-16 flex items-center">
          <Image className="w-16" src={logo} alt="Logo" />
        </nav>
      </ContainerLayout>
    </div>
  );
};

export default Navbar;
