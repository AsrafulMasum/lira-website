import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="w-full h-16 max-w-[1128px] mx-4 lg:mx-auto flex items-center">
      <Image className="w-16" src={logo} alt="Logo" />
    </nav>
  );
};

export default Navbar;
