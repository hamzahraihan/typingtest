import { useRef } from "react";
import "./App.css";
import { TypingTest } from "./components/typing-test.tsx";
import { useWordContext } from "./context/word-store-context.ts";
import { difficulties, type Difficulty } from "./utils/difficulty.ts";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setDifficulty } = useWordContext((state) => state);

  return (
    <section className="flex text-[#cad3f0] justify-center bg-[#1f1e2e]">
      <div className="grid grid-rows-6 p-5 min-h-screen max-w-screen-lg">
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
          <TypingTest inputRef={inputRef} />
        </div>
        <footer className="flex flex-col">
          <div className="flex mt-auto">
            <div className="flex text-gray-500 items-center gap-1">
              <span>
                <GitHubLogoIcon />
              </span>
              <a
                className="text-center text-xs"
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
