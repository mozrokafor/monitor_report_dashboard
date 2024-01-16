import { _convertTime, cn, convertToSecs } from "@/lib/utils";
import Grid from "../Grid";

interface ComponentGridProps {
  runs: any;
  latest: any;
}

interface RunProps {
  title: string;
  duration: number;
  tests: number;
  passed: boolean;
  failedCount: number;
}

// displays green if latest passed, red failure number
const ComponentGrid = ({ runs, latest }: ComponentGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {runs.map(({ title, duration, tests, passed, failedCount }: RunProps) => {
        const returnBox = (testNumber: number) => {
          if (testNumber >= 80) {
            return "h-[250px]";
          } else if (testNumber >= 45 && testNumber <= 45) {
            return "h-[120px]";
          } else {
            return "h-[70px]";
          }
        };
        return (
          <div
            key={Math.random()}
            className={cn(
              `p-16 rounded-lg text-white font-bold border flex items-center justify-center flex-col ${returnBox(
                tests
              )}`,
              {
                "bg-green-500": passed,
                "bg-red-600": !passed,
              }
            )}
          >
            <div className="capitalize">{title}</div>
            <div className="text-xs text-zinc-100 mt-2">({tests} Tests)</div>
            <div
              className={cn("text-red-500 text-xs", {
                hidden: passed,
                "text-red-300": !passed,
              })}
            >
              ({failedCount} Failures )
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentGrid;
