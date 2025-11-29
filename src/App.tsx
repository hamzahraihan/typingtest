import { useRef } from "react";
import "./App.css";
import { TypingTest } from "./components/typing-test.tsx";
import { useWordContext } from "./context/word-store-context.ts";
import { difficulties, type Difficulty } from "./utils/difficulty.ts";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Result from "./components/result.tsx";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setDifficulty = useWordContext((state) => state.setDifficulty);
  const state = useWordContext((state) => state.state);

  return (
    <section className="flex text-[#cad3f0] justify-center bg-[#1f1e2e]">
      <div className="grid grid-rows-6 p-5 min-h-screen max-w-screen-lg w-screen">
        <div className="flex flex-col row-span-2 items-start">
          <h1 className="text-3xl font-medium self-center">Typing Test</h1>
          <div className="flex gap-2 items-start mt-auto">
            {difficulties.map((diff, i) => (
              <button
                key={diff + "-" + i}
                className="border rounded-md border-gray-[#cad3f0] p-1"
                onClick={() => setDifficulty(diff as Difficulty)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
        <div className="row-span-3 self-center">
          {state === "FINISHED" ? (
            <Result className="w-full" />
          ) : (
            <TypingTest inputRef={inputRef} />
          )}
        </div>
        <footer className="flex flex-col">
          <div className=" flex mt-auto">
            <div className="flex p-1 hover:opacity-50 text-gray-500 items-center gap-1 duration-100">
              <span>
                <GitHubLogoIcon />
              </span>
              <a
                className="leading-none tracking-tight text-sm"
                href="https://github.com/hamzahraihan/typingtest"
              >
                github
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default App;
