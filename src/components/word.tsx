import { forwardRef, useLayoutEffect, useState } from "react";

type Props = {
  word: string;
  isCurrent: boolean;
  inputWord: string;
  typedWords: string[];
  currentWordIndex: number;
  wordIndex: number;
};

export const Word = forwardRef<HTMLDivElement, Props>(function Word(
  { word, isCurrent, inputWord, typedWords, currentWordIndex, wordIndex },
  ref,
) {
  const [caretIndex, setCaretIndex] = useState<number>(0);

  useLayoutEffect(() => {
    setCaretIndex(inputWord.length);
  }, [inputWord.length]);

  const wordChecker = (): "error" | "active" | "typed" | "" => {
    if (typedWords[wordIndex] == word) {
      return "typed";
    }
    if (wordIndex < currentWordIndex && typedWords[wordIndex] !== word) {
      return "error";
    }
    if (isCurrent) {
      return "active";
    }
    return "";
  };

  return (
    <div className={"scroll-mt-9 m-1 text-3xl " + wordChecker()} ref={ref}>
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
            className={"relative inline-block px-[0.8px] " + className}
          >
            {isCurrent && caretIndex === j && (
              <span className="h-7 w-0.5 rounded-lg absolute left-0 translate-y-[0.5rem] font-bold animate-fade-blink bg-red-700" />
            )}
            {letter}
          </span>
        );
      })}

      {/* Render current overflow letters (if any) */}
      {isCurrent && inputWord.length > word.length && (
        <>
          {inputWord
            .slice(word.length)
            .split("")
            .map((extra, i) => (
              <span
                key={`overflow-${i}`}
                className="text-red-500 opacity-70 inline-block px-[0.8px]"
              >
                {extra}
              </span>
            ))}
        </>
      )}

      {/* Render typed overflow letters (if any) */}
      {!isCurrent &&
        wordIndex < currentWordIndex &&
        typedWords[wordIndex].length > word.length && (
          <>
            {typedWords[wordIndex]
              .slice(word.length)
              .split("")
              .map((extra, i) => (
                <span
                  key={`overflow-${i}`}
                  className="text-red-500 opacity-70 inline-block px-[0.8px]"
                  data-letteroverflow={i}
                >
                  {extra}
                </span>
              ))}
          </>
        )}
    </div>
  );
});
