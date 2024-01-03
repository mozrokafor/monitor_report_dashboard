import Container from "@/components/Container";
import SuitePage from "@/components/suiteComponents/SuitePage";
import { Metadata } from "next";
import moment from "moment";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import getFullSuite from "../actions/getFullSuite";
import getFullSuiteHistory from "../actions/getFullSuiteHistory";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Monitor Dashboard",
  description: "Monitor Test Health Dashboard",
};

export default async function Home() {
  // @ts-ignore
  const { data, trend, latestData, testSuiteRuns, healthPercentage } =
    await getFullSuite();
  const results = await getFullSuiteHistory();

  const renderTrend = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowBigUp className="h-16 w-16 text-green-600" />;
      case "down":
        return <ArrowBigDown className="h-16 w-16 text-red-700" />;
      case "steady":
        return <ArrowBigUp className="h-16 w-16 text-green-600" />;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar />

      <div className="text-zinc-400 text-xs ml-16 mt-10">
        <span className="font-bold mr-1">Last Run:</span>
        <span>{moment(data[data.length - 1].endTime).format("LLL")}</span>
      </div>
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-1">
        <div className="bg-white shadow rouned-xl p-4 mt-4 h-40 flex items-center justify-center mx-6">
          <div className="font-black text-3xl flex flex-col items-center">
            <span>{Math.floor(healthPercentage)}%</span>
            <span className="text-sm">Healthy</span>
          </div>
        </div>

        <div className="bg-white shadow rouned-xl p-4 mt-4 h-40 flex items-center justify-center mx-6">
          <div className="font-black text-4xl flex flex-col items-center">
            <span>{latestData.testsFlaky}</span>
            <span className="text-sm">Flaky Tests</span>
          </div>
        </div>

        <div className="bg-white shadow rouned-xl p-4 mt-4 h-40 flex items-center justify-center mx-6">
          <div className="font-black text-4xl flex flex-col items-center">
            <span>{latestData.testsFailed}</span>
            <span className="text-sm">Failed Tests</span>
          </div>
        </div>

        <div className="bg-white shadow rouned-xl p-4 mt-4 h-40 flex items-center justify-center mx-6">
          {/* // this can be a line graph icon thats going up or down */}
          <div className="font-black text-4xl flex flex-col items-center">
            <span>{renderTrend(trend)}</span>
            <span className="text-sm capitalize">{trend} Health Trend</span>
          </div>
        </div>
      </Container>
      <Container>
        <SuitePage
          suiteRuns={testSuiteRuns}
          suites={data}
          flakes={results?.flakes[0]}
          failures={results?.failures[0]}
        />
      </Container>
    </>
  );
}
