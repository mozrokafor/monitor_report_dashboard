"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6 sticky h-14 inset-x-0 top-0 z-30 w-full bg-white/75 backdrop-blur-lg trnasition-all mt-4 px-6">
      <h1 className="font-black text-xl">Monitor Test Health Dashboard</h1>
      <div className="flex items-center gap-4 font-semibold text-zinc-400">
        <Link
          className={cn("", {
            "border rounded-lg p-3": pathname == "/",
          })}
          href="/"
        >
          Full Test Suite
        </Link>
        {/* <Link
          className={cn("", {
            "border rounded-lg p-3": pathname == "/smoke",
          })}
          href="/smoke"
        >
          Smoke Test Suite
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
