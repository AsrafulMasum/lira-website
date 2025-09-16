import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";
import CryptoContent from "./tabContents/CryptoContent";

const FilterSection = () => {
  return (
    <section>
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
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="crypto">
          <CryptoContent />
        </TabsContent>
        <TabsContent value="weather">
          Change your weather settings here.
        </TabsContent>
        <TabsContent value="stock">
          Change your stock market settings here.
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FilterSection;
