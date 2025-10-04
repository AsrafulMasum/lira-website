"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 py-3 pl-3 pr-3 lg:pr-4 border border-border-color bg-bg rounded-xl text-dark-primary text-sm font-bold cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M2.5 17.5V2.5H10V4.16667H4.16667V15.8333H10V17.5H2.5ZM13.3333 14.1667L12.1875 12.9583L14.3125 10.8333H7.5V9.16667H14.3125L12.1875 7.04167L13.3333 5.83333L17.5 10L13.3333 14.1667Z"
          fill="#004721"
        />
      </svg>{" "}
      <span className="hidden lg:block">Log out</span>
    </button>
  );
}
