import { useRef } from "react";
import "./App.css";
import { TypingTest } from "./components/typing-test.tsx";
import { useWordContext } from "./context/word-store-context.ts";
import { difficulties, type Difficulty } from "./utils/difficulty.ts";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setDifficulty } = useWordContext((state) => state);

  return (
    <section className="flex justify-center  bg-gray-100">
      <div className="grid grid-rows-6 p-5 min-h-screen max-w-screen-lg">
        <div className="flex items-end">
          <div className="flex gap-2 items-start mt-auto">
            {difficulties.map((diff, i) => (
              <button
                key={diff + "-" + i}
                className="border rounded-md border-gray-50 bg-gray-200 p-1"
                onClick={() => setDifficulty(diff as Difficulty)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
        <div className="row-span-4">
          <TypingTest inputRef={inputRef} />
        </div>
        <footer>footer</footer>
      </div>
    </section>
  );
}

export default App;
