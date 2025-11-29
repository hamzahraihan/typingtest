import type { ReactNode } from "react";
import { useWordContext } from "../context/word-store-context.ts";
import { RandomWords } from "../utils/random-words.ts";
import { Timer } from "../utils/timer.ts";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Result({ className }: { className: string }) {
  const wpm = useWordContext((state) => state.wpm);

  const setInputWord = useWordContext((state) => state.setInputWord);
  const setCurrentWordIndex = useWordContext(
    (state) => state.setCurrentWordIndex,
  );
  const setTypedWords = useWordContext((state) => state.setTypedWords);
  const setWpm = useWordContext((state) => state.setWpm);
  const setState = useWordContext((state) => state.setState);
  const setRandomWords = useWordContext((state) => state.setRandomWords);

  const timer = Timer.instance;

  const handleReloadTest = () => {
    setRandomWords(RandomWords.getRandomWords(30).join(" ").split(" "));
    setInputWord("");
    setCurrentWordIndex(0);
    setTypedWords([]);
    setState("IDLE");
    timer?.reset();
    setWpm(0);
  };

  return (
    <div className={"flex flex-col gap-2 " + className}>
      <Status>WPM: {wpm.toFixed(0)}</Status>
      <Status>RAW: {wpm.toFixed(0)}</Status>
      <Status>Acc: {wpm.toFixed(0)}</Status>
      <button
        className="text-sm hover:bg-opacity-50 rounded-lg p-1 bg-[#313244] flex justify-center items-center gap-1 w-fit duration-75"
        onClick={handleReloadTest}
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
