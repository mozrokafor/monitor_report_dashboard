import { _convertTime } from "@/lib/utils";
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

const FlakeTestTable = ({ headers, tests }: TestTableProps) => {
  return (
    <>
      <h1 className="text-xl font-bold text-center py-3">Flakiness History</h1>
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
                  <TableCell key={idx}>
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

export default FlakeTestTable;
