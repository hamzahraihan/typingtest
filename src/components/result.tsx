import type { ReactNode } from "react";
import { useWordContext } from "../context/word-store-context.ts";
import { ReloadIcon } from "@radix-ui/react-icons";
import Reset from "../utils/reset.tsx";

export default function Result({ className }: { className: string }) {
  const { wpm, raw, acc } = useWordContext((state) => state.result);

  const reset = Reset();

  return (
    <div className={"flex flex-col gap-2 " + className}>
      <Status>WPM: {wpm.toFixed(0)}</Status>
      <Status>RAW: {raw.toFixed(0)}</Status>
      <Status>Acc: {acc.toFixed(0)}%</Status>
      <button
        className="text-sm hover:bg-opacity-50 rounded-lg p-1 bg-[#313244] flex justify-center items-center gap-1 w-fit duration-75"
        onClick={reset}
      >
        <span className="rounded-lg bg-[#45475a] p-1">
          <ReloadIcon />
        </span>
        repeat test
      </button>
    </div>
  );
}

function Status({ children }: { children: ReactNode }) {
  return <div className="rounded-lg p-2 bg-[#45475a] w-fit">{children}</div>;
}
