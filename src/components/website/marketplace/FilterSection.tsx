import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import CryptoContent from "./tabGroupContents/CryptoContent";

const FilterSection = () => {
  return (
    <section className="bg-[#FAFFFC]">
      <Tabs defaultValue="crypto" className="w-full h-12">
        <ContainerLayout>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="crypto">Crypto Market</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="stock">Stock Market</TabsTrigger>
          </TabsList>
        </ContainerLayout>
        <TabsContent value="all">
          <CryptoContent />
        </TabsContent>
        <TabsContent value="crypto">
          <CryptoContent />
        </TabsContent>
        <TabsContent value="weather">
          <CryptoContent />
        </TabsContent>
        <TabsContent value="stock">
          <CryptoContent />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FilterSection;
