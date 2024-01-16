import { _convertTime, cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TestTableProps {
  headers: string[];
  tests: any[];
}

const TestTable = ({ headers, tests }: TestTableProps) => {
  return (
    <>
      <h1 className="text-xl font-bold text-center py-3">
        Latest Test Run Details
      </h1>
      <div className="h-[63vh] relative overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={idx} className="w-[100px] capitalize">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test, idx) => (
              <TableRow key={idx}>
                {headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    className={cn("text-sm", {
                      "bg-green-600": test.status === "passed",
                      "bg-red-600": test.status === "failed",
                      "bg-yellow-400": test.status === "skipped",
                      "bg-zinc-400": test.status === "timedOut",
                      capitalize: header !== "title",
                    })}
                  >
                    {header === "duration"
                      ? _convertTime(test[header])
                      : test[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TestTable;
