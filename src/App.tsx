import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { RandomWords } from "./util/random-words.ts";

function App() {
  const [inputWord, setInputWord] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  console.log(currentWordIndex);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  console.log(typedWords);

  const inputRef = useRef<HTMLInputElement>(null);
  const randomWords = useMemo(
    () => RandomWords.getRandomWords(30).join(" ").split(" "),
    [],
  );
  console.log("word  in random word : ", randomWords[currentWordIndex]);

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
          if (inputWord.length === 0 && currentWordIndex > 0) {
            setTypedWords((prev) => {
              const copy = [...prev];
              setInputWord(copy[currentWordIndex - 1]);
              copy.splice(currentWordIndex - 1, 1);
              return copy;
            });
            setCurrentWordIndex((prev) => prev - 1);
          }

          // setTypedWords((prev) => {
          //   const copy = [...prev];
          //   const lastTyped: string = copy[previousIndex];
          //
          //   if (lastTyped) {
          //     const chars = lastTyped.split("");
          //     chars.pop();
          //     if (chars.length === 0) {
          //       copy.splice(previousIndex, 1);
          //       setCurrentWordIndex(previousIndex);
          //     } else {
          //       copy[previousIndex] = chars.join("");
          //       setCurrentWordIndex(previousIndex + 1);
          //     }
          //   }
          //   return copy;
          // });
        }
      }

      // pressed space or tab key event
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();

        // const isCorrect = inputWord.trim() === randomWords[currentWordIndex];
        //
        // if (!isCorrect) {
        //   setTypedWords((prev) => {
        //     const newWords = [...prev];
        //     if (inputWord.length > 0) {
        //       newWords[currentWordIndex - 1] = inputWord;
        //     }
        //     return newWords;
        //   });
        // }

        const trimmedInput = inputWord.trim();
        if (trimmedInput.length === 0) return;

        if (inputWord.length > 0) {
          setTypedWords((prev) => {
            const copy = [...prev];
            if (currentWordIndex < copy.length) {
              copy[currentWordIndex - 1] =
                copy[currentWordIndex - 1] + trimmedInput;
            } else {
              copy.push(trimmedInput);
            }
            console.log(copy[currentWordIndex]);
            console.log("typedWords after update:", copy);
            return copy;
          });

          setInputWord("");
          setCurrentWordIndex((prev) => prev + 1);
          console.log(
            "now onto the next word: ",
            randomWords[currentWordIndex],
          );
        }

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
          minLength={0}
          maxLength={10}
        />
        <div className="absolute">{inputWord}</div>
        <div id="letter" className="flex flex-wrap">
          {randomWords.map((word, i) => {
            const isCurrent = i === currentWordIndex;
            return (
              <div key={i} className="m-1" data-wordindex={i}>
                {word.split("").map((letter, j) => {
                  let className = "";
                  if (isCurrent && inputWord[j] === letter) {
                    className = "text-black";
                  }
                  if (isCurrent && inputWord[j] != letter) {
                    className = "text-red-500";
                  }
                  if (inputWord[j] == undefined) {
                    className = "opacity-20";
                  }

                  if (!isCurrent && typedWords[i]) {
                    className =
                      typedWords[i][j] === letter
                        ? "text-black"
                        : "text-red-500";
                  }

                  if (i > currentWordIndex) {
                    className = "opacity-20";
                  }
                  return (
                    <span key={j} data-letterindex={j} className={className}>
                      {letter}
                    </span>
                  );
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
