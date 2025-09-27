"use client";

import { useSearchParams } from "next/navigation";

export const useGetSearchParams = () => {
  const searchParams = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());

  return paramsObject;
};