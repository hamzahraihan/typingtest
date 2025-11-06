import { useRef } from "react";
import "./App.css";
import { TypingTest } from "./components/typing-test.tsx";
import { useWordContext } from "./context/word-store-context.ts";

function App() {
  const inputWord = useWordContext((state) => state.inputWord);
  const setInputWord = useWordContext((state) => state.setInputWord);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-100">
      <div className="relative text-xl h-fit ">
        <input
          id="input"
          type="text"
          ref={inputRef}
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          className="opacity-0"
          minLength={0}
          maxLength={10}
        />
        <div className="absolute">{inputWord}</div>
        <TypingTest inputRef={inputRef} />
      </div>
    </div>
  );
}

export default App;
