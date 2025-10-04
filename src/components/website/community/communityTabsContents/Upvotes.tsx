import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import SearchFilter from "./feeds/SearchFilter";
import Ideas from "./feeds/Ideas";

const Upvotes = () => {
  return (
    <section className="bg-[#F2F7F5] min-h-[calc(100vh-160px)] pt-4">
      <ContainerLayout>
        <SearchFilter />
        <Ideas />
      </ContainerLayout>
    </section>
  );
};

export default Upvotes;
