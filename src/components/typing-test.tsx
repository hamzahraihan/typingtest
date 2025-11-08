import { useEffect, useMemo } from "react";
import { RandomWords } from "../utils/random-words.ts";
import { Word } from "./word.tsx";
import { useWordContext } from "../context/word-store-context.ts";
import { WordStatus } from "./stats.tsx";
import { useKeyboardEvent } from "../events/keyboard.tsx";

export const TypingTest = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const inputWord = useWordContext((state) => state.inputWord);
  const setInputWord = useWordContext((state) => state.setInputWord);
  const currentWordIndex = useWordContext((state) => state.currentWordIndex);
  const setCurrentWordIndex = useWordContext(
    (state) => state.setCurrentWordIndex,
  );
  const typedWords = useWordContext((state) => state.typedWords);
  const setTypedWords = useWordContext((state) => state.setTypedWords);

  const randomWords = useMemo(
    () => RandomWords.getRandomWords(30).join(" ").split(" "),
    [],
  );

  const keyboardEvent = useKeyboardEvent({
    inputRef,
    currentWordIndex,
    inputWord,
    randomWords,
    typedWords,
    setCurrentWordIndex,
    setTypedWords,
    setInputWord,
  });

  useEffect(() => {
    window.addEventListener("keydown", keyboardEvent.handleKeyDown);
    return () =>
      window.removeEventListener("keydown", keyboardEvent.handleKeyDown);
  }, [keyboardEvent, inputRef]);
  const inputFocus = inputRef.current === document.activeElement;

  return (
    <div className="flex flex-col">
      <WordStatus
        typedWordsLength={typedWords.length}
        randomWordsLength={randomWords.length}
        className={inputFocus ? "opacity-100" : "opacity-0"}
      />
      <div id="letter" className="flex flex-wrap">
        {randomWords.map((word, i) => {
          const isCurrent = i === currentWordIndex;
          return (
            <Word
              key={i}
              word={word}
              isCurrent={isCurrent}
              wordIndex={i}
              currentWordIndex={currentWordIndex}
              inputWord={inputWord}
              typedWords={typedWords}
            />
          );
        })}
      </div>
    </div>
  );
};
