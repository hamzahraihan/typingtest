import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { RandomWords } from "./util/random-words.ts";

function App() {
  const [inputWord, setInputWord] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  console.log(currentWordIndex);
  const [typedWords, setTypedWords] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const randomWords = useMemo(() => RandomWords.getRandomWords(30), []);

  console.log("word placed in typedWords: ", typedWords);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      inputRef.current?.focus();

      // pressed backspace key event
      if (e.key === "Backspace" || e.key == "Delete") {
        const previousIndex = currentWordIndex - 1;
        const previousWord = randomWords[previousIndex];
        const previousTypedWord = typedWords[previousIndex];
        console.log("from previous random words: ", previousWord);
        console.log("from previous typed words: ", previousTypedWord);

        if (!previousWord || previousTypedWord === undefined) return;

        const isCorrect = previousWord === previousTypedWord;
        if (!isCorrect) {
          setTypedWords((prev) => {
            const newWords = [...prev];
            const lastTyped: string = newWords[previousIndex];

            if (lastTyped) {
              const chars = lastTyped.split("");
              chars.pop();

              if (chars.length === 0) {
                newWords.splice(previousIndex, 1);
                setCurrentWordIndex(previousIndex);
              } else {
                newWords[previousIndex] = chars.join("");
                setCurrentWordIndex(previousIndex + 1);
              }
            }
            return newWords;
          });
        }
      }

      // pressed space or tab key event
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
        // const isCorrect = inputWord.trim() === currentWord;
        if (inputWord.length > 0 || inputWord) {
          setTypedWords((prev) => [...prev, inputWord]);
          setInputWord("");
          setCurrentWordIndex((prev) => prev + 1);
        }

        console.log("now onto the next word: ", randomWords[currentWordIndex]);

        // if (isCorrect) {
        //   setInputWord("");
        //
        //   console.log(
        //     "correct! now onto the word: ",
        //     randomWords[currentWordIndex + 1],
        //   );
        //   console.log("");
        //   setCurrentWordIndex((prev) => prev + 1);
        // }
      }
    },
    [currentWordIndex, inputWord, randomWords, typedWords],
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
                <div key={i} className={`m-1 opacity-20`} data-wordindex={i}>
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
