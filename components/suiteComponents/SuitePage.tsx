import Container from "../Container";
import FailuresTestTable from "../FailuresTestTable";
import FlakeTestTable from "../FlakeTestTable";
import TestTable from "../TestTable";
import ComponentGrid from "../graphs/ComponentGrid";
import DurationBarGraph from "../graphs/DurationBarGraph";
import DurationBarGraphBrowsers from "../graphs/DurationBarGraphBrowsers";
import StatusLineGraph from "../graphs/StatusLineGraph";

interface SuitePageProps {
  runs: any;
  suiteRuns: any;
  failures: any[];
  flakes: any[];
  browsers?: any[];
  suites: any[];
  latest: any;
}

const headers = ["status", "title", "browser", "duration"];
const historyHeaders = ["status", "title", "browser", "time"];

const SuitePage = ({
  runs,
  suiteRuns,
  failures,
  flakes,
  browsers,
  suites,
  latest,
}: SuitePageProps) => {
  return (
    <div>
      <div className="w-full mb-20">
        <h1 className="text-center underline font-bold text-xl">Components</h1>
        <span className="text-center flex items-center justify-center text-xs text-zinc-500">
          (Latest Run)
        </span>
        <Container className="flex items-center w-[60vw]">
          <ComponentGrid runs={suites} latest={latest} />
        </Container>
      </div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[50vh] rounded-lg overflow-y-scroll flex items-center">
          <StatusLineGraph chartData={runs} />
        </Container>
        <Container className="border h-[50vh] rounded-lg flex items-center">
          <DurationBarGraphBrowsers chartData={browsers} />
        </Container>
      </div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[50vh] rounded-lg overflow-y-scroll">
          <TestTable headers={headers} tests={suiteRuns} />
        </Container>
        <Container className="border h-[50vh] rounded-lg flex items-center">
          <DurationBarGraph chartData={runs} />
        </Container>
      </div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[50vh] rounded-lg overflow-y-scroll">
          <FailuresTestTable headers={historyHeaders} tests={failures ?? []} />
        </Container>
        <Container className="border h-[50vh] rounded-lg overflow-y-scroll">
          <FlakeTestTable headers={historyHeaders} tests={flakes ?? []} />
        </Container>
      </div>
    </div>
  );
};

export default SuitePage;
