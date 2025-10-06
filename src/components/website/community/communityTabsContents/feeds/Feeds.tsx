import React from "react";
import UploadForm from "./UploadForm";
import SearchFilter from "./SearchFilter";
import Ideas from "./Ideas";
import ContainerLayout from "@/layout/ContainerLayout";

const Feeds = () => {
  return (
    <section className="bg-[#F2F7F5] min-h-[calc(100vh-160px)] pt-4">
      <ContainerLayout>
        <UploadForm />
        <SearchFilter />
        <Ideas from="feeds" />
      </ContainerLayout>
    </section>
  );
};

export default Feeds;
