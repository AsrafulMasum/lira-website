import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Feeds from "./communityTabsContents/feeds/Feeds";
import Upvotes from "./communityTabsContents/Upvotes";
import MyIdeas from "./communityTabsContents/MyIdeas";
import ContainerLayout from "@/layout/ContainerLayout";

const CommunityTabs = () => {
  return (
    <section>

      <div className="pb-6">
        <Tabs defaultValue="feeds" className="w-full">
          <div className="border-b border-border-color sticky top-16 z-50 bg-[#FAFFFC]">
            <ContainerLayout>
              <h4 className="text-lg text-[#002913] font-semibold mb-4">
                Community
              </h4>
              <h2 className="text-2xl font-semibold text-dark-primary mb-8">
                Where markets are created 🔥
              </h2>
              <TabsList className="flex w-full bg-transparent rounded-none h-auto p-0">
                <TabsTrigger
                  value="feeds"
                  className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
                >
                  Ideas
                </TabsTrigger>
                <TabsTrigger
                  value="upvotes"
                  className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
                >
                  Your upvotes
                </TabsTrigger>
                <TabsTrigger
                  value="my-ideas"
                  className="py-2 !w-fit border-b-2 border-transparent text-base font-semibold cursor-pointer transition-colors data-[state=active]:border-dark-primary data-[state=active]:text-dark-primary data-[state=active]:font-bold data-[state=active]:bg-transparent text-gray hover:text-gray hover:border-gray-300 bg-transparent rounded-none shadow-none"
                >
                  Your ideas
                </TabsTrigger>
              </TabsList>
            </ContainerLayout>
          </div>


            <TabsContent value="feeds">
              <Feeds />
            </TabsContent>

            <TabsContent value="upvotes">
              <Upvotes />
            </TabsContent>

            <TabsContent value="my-ideas">
              <MyIdeas />
            </TabsContent>

        </Tabs>
      </div>
    </section>
  );
};

export default CommunityTabs;
