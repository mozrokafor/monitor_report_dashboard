import Container from "../Container";
import FailuresTestTable from "../FailuresTestTable";
import FlakeTestTable from "../FlakeTestTable";
import TestTable from "../TestTable";
import DurationBarGraph from "../graphs/DurationBarGraph";
import DurationBarGraphBrowsers from "../graphs/DurationBarGraphBrowsers";
import DurationBarGraphTotal from "../graphs/DurationBarGraphTotal";
import StatusLineGraph from "../graphs/StatusLineGraph";

interface SuitePageProps {
  suites: any;
  suiteRuns: any;
  failures: any[];
  flakes: any[];
  browsers?: any[];
}

const headers = ["status", "title", "browser", "duration"];
const historyHeaders = ["status", "title", "browser", "duration", "time"];

const SuitePage = ({
  suites,
  suiteRuns,
  failures,
  flakes,
  browsers,
}: SuitePageProps) => {
  return (
    <div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[60vh] rounded-lg overflow-y-scroll flex items-center">
          <StatusLineGraph chartData={suites} />
        </Container>
        <Container className="border h-[60vh] rounded-lg flex items-center">
          <DurationBarGraphBrowsers chartData={suites} />
        </Container>
      </div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[60vh] rounded-lg overflow-y-scroll">
          <TestTable headers={headers} tests={suiteRuns} />
        </Container>
        <Container className="border h-[60vh] rounded-lg flex items-center">
          <DurationBarGraph chartData={suites} />
        </Container>
      </div>
      <div className="w-full flex flex-row justify-between gap-10 mb-20">
        <Container className="border h-[60vh] rounded-lg overflow-y-scroll">
          <FailuresTestTable headers={historyHeaders} tests={failures ?? []} />
        </Container>
        <Container className="border h-[60vh] rounded-lg overflow-y-scroll">
          <FlakeTestTable headers={historyHeaders} tests={flakes ?? []} />
        </Container>
      </div>
    </div>
  );
};

export default SuitePage;
