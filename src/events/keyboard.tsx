import React, { useCallback } from "react";
import { useWordContext } from "../context/word-store-context.ts";

export function useKeyboardEvent({
  inputRef,
  randomWords,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  randomWords: string[];
}) {
  const inputWord = useWordContext((state) => state.inputWord);
  const setInputWord = useWordContext((state) => state.setInputWord);
  const currentWordIndex = useWordContext((state) => state.currentWordIndex);
  const setCurrentWordIndex = useWordContext(
    (state) => state.setCurrentWordIndex,
  );
  const previousWords = useWordContext((state) => state.previousWords);
  const setPreviousWords = useWordContext((state) => state.setPreviousWords);

  const typedWords = useWordContext((state) => state.typedWords);
  const setTypedWords = useWordContext((state) => state.setTypedWords);

  const onFocus = useCallback(
    (e: KeyboardEvent) => {
      inputRef.current?.focus();

      // pressed backspace key event
      if (e.key === "Backspace" || e.key == "Delete") {
        const currentWord = randomWords[currentWordIndex];
        const previousIndex = currentWordIndex - 1;
        const previousWord = previousWords[previousIndex];
        const previousTypedWord = typedWords[previousIndex];
        console.log("from previous words: ", previousWord);
        console.log("from previous typed words: ", previousTypedWord);

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
        setPreviousWords([...previousWords, randomWords[currentWordIndex]]);

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
            console.log("typedWords after update:", copy);
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
      previousWords,
      setPreviousWords,
    ],
  );

  return { onFocus };
}
