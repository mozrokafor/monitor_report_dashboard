import React from "react";
import Grid from "./Grid";
import ComponentGrid from "./graphs/ComponentGrid";

interface SuitesGridProps {
  suite: any[];
}

interface Suite {
  title: string;
  duration: number;
  tests: Object[];
}

const SuitesGrid = ({ suite }: SuitesGridProps) => {
  console.log(suites[0]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {suites.map((suite) => (
        <ComponentGrid />
      ))}
    </div>
  );
};

export default SuitesGrid;
