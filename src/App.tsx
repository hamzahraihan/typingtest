import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { RandomWords } from "./util/random-words.ts";

function App() {
  const [inputWord, setInputWord] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const randomWords = useMemo(() => RandomWords.getRandomWords(30), []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      inputRef.current?.focus();
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
        const currentWord = randomWords[currentWordIndex];
        const isCorrect = inputWord.trim() === currentWord;

        if (isCorrect) {
          completedWords.push(currentWord);
          setCurrentWordIndex((prev) => prev + 1);
          setInputWord("");

          console.log(
            "correct! now onto the word: ",
            randomWords[currentWordIndex + 1],
          );
          console.log("word placed in completedWords: ", completedWords);
        }
      }
    },
    [currentWordIndex, inputWord, randomWords, completedWords],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
        />
        <div className="absolute">{inputWord}</div>
        <div id="letter" className="flex flex-wrap">
          {randomWords
            .join(" ")
            .split(" ")
            .map((word, i) => {
              return (
                <div
                  key={i}
                  className={`m-1 ${i == currentWordIndex ? "active" : ""}`}
                  data-wordindex={i}
                >
                  {word.split("").map((letter, j) => {
                    return <span key={j}>{letter}</span>;
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
