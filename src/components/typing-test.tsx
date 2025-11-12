import { useEffect, useRef, useState } from "react";
import { RandomWords } from "../utils/random-words.ts";
import { Word } from "./word.tsx";
import { useWordContext } from "../context/word-store-context.ts";
import { WordStatus } from "./stats.tsx";
import { useKeyboardEvent } from "../events/keyboard.tsx";
import { ReloadIcon } from "@radix-ui/react-icons";

export const TypingTest = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const blurTimeoutRef = useRef<number | null>(0);

  const inputWord = useWordContext((state) => state.inputWord);
  const setInputWord = useWordContext((state) => state.setInputWord);
  const currentWordIndex = useWordContext((state) => state.currentWordIndex);
  const setCurrentWordIndex = useWordContext(
    (state) => state.setCurrentWordIndex,
  );
  const typedWords = useWordContext((state) => state.typedWords);
  const setTypedWords = useWordContext((state) => state.setTypedWords);

  const [randomWords, setRandomWords] = useState(() =>
    RandomWords.getRandomWords(30).join(" ").split(" "),
  );

  const handleReloadTest = () => {
    setRandomWords(RandomWords.getRandomWords(30).join(" ").split(" "));
    setInputWord("");
    setCurrentWordIndex(0);
    setTypedWords([]);
  };

  // const randomWords = useMemo(
  //   () => RandomWords.getRandomWords(30).join(" ").split(" "),
  //   [],
  // );

  const keyboardEvent = useKeyboardEvent({
    inputRef,
    randomWords,
  });

  useEffect(() => {
    window.addEventListener("keydown", keyboardEvent.onFocus);
    return () => {
      window.removeEventListener("keydown", keyboardEvent.onFocus);
    };
  }, [keyboardEvent, inputRef]);

  return (
    <div className="flex flex-col relative">
      {!isFocus && (
        <div className="flex justify-center items-center absolute h-full w-full ">
          <p className="text-xs">Click here or press any key to focus</p>
        </div>
      )}
      <input
        id="input"
        type="text"
        ref={inputRef}
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        className="h-full w-full z-10 opacity-0 absolute"
        minLength={0}
        maxLength={20}
        onFocus={() => {
          if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
          setIsFocus(true);
        }}
        onBlur={() => {
          blurTimeoutRef.current = setTimeout(() => {
            setIsFocus(false);
          }, 1000);
        }}
        autoComplete="off"
      />
      <div className="absolute hidden">{inputWord}</div>
      <WordStatus
        typedWordsLength={typedWords.length}
        randomWordsLength={randomWords.length}
        className={isFocus ? "opacity-100" : "opacity-0"}
      />
      <div
        id="letter"
        className={`${isFocus ? "blur-0" : "blur-sm"} duration-100 flex flex-wrap`}
      >
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
      <button onClick={handleReloadTest} className="self-center z-10 p-5">
        <ReloadIcon
          stroke="#9a9a9a"
          width={20}
          height={20}
          fontWeight="10"
          className="text-gray-400"
        />
      </button>
    </div>
  );
};
