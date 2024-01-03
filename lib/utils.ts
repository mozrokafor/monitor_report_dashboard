import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const _convertTime = (ms: number) => {
  if (ms > 90_000) {
    const mins = ms / 60_000;
    return `${mins} minutes`;
  }

  const secs = ms / 1_000;
  return `${secs.toFixed(2)} seconds`;
};

export const convertToSecs = (ms: number) => {
  if (ms > 90_000) {
    return ms / 60_000;
  }

  return ms / 1_000;
};
