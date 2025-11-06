import TypesManagement from "@/components/dashboard/typesAndUnits/TypesManagement";
import UnitManagement from "@/components/dashboard/typesAndUnits/UnitManagement";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="space-y-6 rounded-md p-6 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Unit & Types Management
          </CardTitle>
          <p className="text-muted-foreground">Manage unit types and units</p>
        </CardHeader>
      </Card>

      <Tabs
        defaultValue="types"
        className="w-full bg-white rounded-lg p-4 border border-gray-200 shadow-md"
      >
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
