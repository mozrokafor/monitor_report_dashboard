import moment from "moment";
import { _convertTime, cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import React from "react";

interface TestTableProps {
  headers: string[];
  tests: any[];
}

const FailuresTestTable = ({ headers, tests }: TestTableProps) => {
  return (
    <>
      <h1 className="text-xl font-bold text-center py-3">Failure History</h1>
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
              <React.Fragment key={idx}>
                <TableRow key={idx}>
                  {headers.map((header, idx) => (
                    <TableCell
                      key={idx}
                      className={cn("text-sm", {
                        capitalize: header !== "title",
                        "text-xs": header === "time",
                      })}
                    >
                      {header === "time"
                        ? moment(test[header]).format("lll")
                        : test[header]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Collapsible>
                      <CollapsibleTrigger className="border-b min-w-[100px]">
                        Expand Error
                      </CollapsibleTrigger>
                      <CollapsibleContent className="text-white py-6 px-3 bg-black mt-6 min-w-[260px] animate-in transition-all duration-300 whitespace-pre-wrap">
                        <code>{test.errors[0].stack}</code>
                      </CollapsibleContent>
                    </Collapsible>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FailuresTestTable;
