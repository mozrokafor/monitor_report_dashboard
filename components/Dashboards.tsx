import SmokePage from "./smokeComponents/SmokePage";
import SuitePage from "./suiteComponents/SuitePage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const Dashboards = () => {
  return (
    <div className="flex my-2">
      <Tabs
        defaultValue="smoke"
        className="flex items-center justify-center flex-col"
      >
        <TabsList>
          <TabsTrigger value="smoke">Smoke Tests</TabsTrigger>
          <TabsTrigger value="suite">Full Suite Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="smoke" className="w-full">
          <SmokePage />
        </TabsContent>

        <TabsContent value="suite" className="w-full">
          <SuitePage data={{}} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboards;
