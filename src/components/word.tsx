import { useEffect, useState } from "react";

export const Word = ({
  word,
  isCurrent,
  inputWord,
  typedWords,
  currentWordIndex,
  wordIndex,
}: {
  word: string;
  isCurrent: boolean;
  inputWord: string;
  typedWords: string[];
  currentWordIndex: number;
  wordIndex: number;
}) => {
  const [caretIndex, setCaretIndex] = useState<number>(0);

  useEffect(() => {
    setCaretIndex(inputWord.length);
  }, [inputWord]);

  return (
    <div className={`m-1 ${isCurrent ? "active" : ""}`}>
      {word.split("").map((letter, j) => {
        let className = "";
        // if user input a correct letter, the color change to black
        if (isCurrent && inputWord[j] === letter) {
          className = "text-black";
        }

        // if user input an incorrect letter, the color change to red
        if (isCurrent && inputWord[j] != letter) {
          className = "text-red-500";
        }

        // if user not input a letter based from the current word, the color became transparent
        if (isCurrent && inputWord[j] == undefined) {
          className = "text-gray-400";
        }

        // if user already typed a word, the color will change based on correctness
        if (!isCurrent && typedWords[wordIndex]) {
          className =
            typedWords[wordIndex][j] === letter ? "text-black" : "text-red-500";
        }

        // the currentWordIndex will be increase after user pressed tab or space button
        // the currentWordIndex will not increase if inputWord is undefined or empty string
        // the wordIndex is based from array of generated word
        // if the user isn't currently typing this word, make it transparent.
        if (wordIndex > currentWordIndex) {
          className = "text-gray-400";
        }

        return (
          <span
            key={j}
            data-letterindex={j}
            className={"relative inline-block p-[0.5px] " + className}
          >
            {isCurrent && caretIndex === j && (
              <span className="h-6 w-0.5 rounded-lg absolute left-0 translate-y-1 font-bold animate-fade-blink bg-red-700" />
            )}
            {letter}
          </span>
        );
      })}
    </div>
  );
};
