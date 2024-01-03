import { cn } from "@/lib/utils";

const Container = ({ className, children }: {
    className?: string;
    children: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto mt-10 w-full px-2.5 md:px-10", className)}>
        {children}
    </div>
  )
}

export default Container