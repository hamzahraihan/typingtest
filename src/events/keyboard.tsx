import { useCallback, type RefObject } from "react";
import { useWordContext } from "../context/word-store-context.ts";
import { info, warn } from "../utils/logger.ts";

export function useKeyboardEvent({
  inputRef,
  randomWords,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  randomWords: string[];
}) {
  const {
    inputWord,
    setInputWord,
    currentWordIndex,
    setCurrentWordIndex,
    typedWords,
    setTypedWords,
    increaseCorrect,
    increaseIncorrect,
  } = useWordContext((state) => state);

  const onFocus = useCallback(
    (e: KeyboardEvent) => {
      inputRef.current?.focus();

      const currentWord = randomWords[currentWordIndex];
      const previousIndex = currentWordIndex - 1;
      const previousWord = randomWords[previousIndex];
      const previousTypedWord = typedWords[previousIndex];

      const typedChar = e.key;
      const index = inputWord.length;

      // checking each typed key is equal to current word chars
      if (e.key === " " || e.ctrlKey || e.altKey || e.shiftKey) {
        // not include space key
        warn("not include other key", typedChar, currentWord[index]);
      } else if (typedChar === currentWord[index]) {
        warn("typed char is correct", typedChar, currentWord[index]);
        increaseCorrect();
      } else {
        warn("typed char is incorrect", typedChar, currentWord[index]);
        increaseIncorrect();
      }

      // pressed backspace key event
      if (e.key === "Backspace" || e.key == "Delete") {
        info("from previous words: ", previousWord);
        info("from previous typed words: ", previousTypedWord);

        if (!previousWord || previousTypedWord === undefined) return;

        if (!currentWord) return;

        const isCorrect = previousWord === previousTypedWord;
        if (!isCorrect) {
          if (inputWord.length === 0 && currentWordIndex > 0) {
            setTypedWords((prev) => {
              const copy = [...prev];
              setInputWord(copy[currentWordIndex - 1]);
              copy.splice(currentWordIndex - 1, 1);
              return copy;
            });
            setCurrentWordIndex(currentWordIndex - 1);
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
            if (copy.length == randomWords.length) return copy;

            if (currentWordIndex < copy.length) {
              copy[currentWordIndex - 1] =
                copy[currentWordIndex - 1] + trimmedInput;
            } else {
              copy.push(trimmedInput);
            }
            console.log(
              "file: keyboard.tsx, line: 110,info: typedWords after update: ",
              copy,
            );
            return copy;
          });

          setInputWord("");
          setCurrentWordIndex(currentWordIndex + 1);
          console.log(
            "now onto the next word: ",
            randomWords[currentWordIndex + 1],
          );
        }
      }
    },
    [
      currentWordIndex,
      inputWord,
      randomWords,
      typedWords,
      inputRef,
      setCurrentWordIndex,
      setTypedWords,
      setInputWord,
      increaseCorrect,
      increaseIncorrect,
    ],
  );

  return { onFocus };
}
