import TypesManagement from "@/components/dashboard/typesAndUnits/TypesManagement";
import UnitManagement from "@/components/dashboard/typesAndUnits/UnitManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="space-y-6 bg-white rounded-md p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-primary">
        Unit & Types Management
      </h1>

      <Tabs defaultValue="types" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="types">Types</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
        </TabsList>
        <TabsContent value="types">
          <TypesManagement />
        </TabsContent>
        <TabsContent value="units">
          <UnitManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
