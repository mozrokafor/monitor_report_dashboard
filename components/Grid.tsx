interface GridProps {
  title: string;
  duration: number;
  tests: number;
}

const Grid = ({ title, duration, tests }: GridProps) => {
  return (
    <div key={title} className="text-zinc-500">
      {title}
    </div>
  );
};

export default Grid;
