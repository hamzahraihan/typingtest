import { useCallback, useEffect, useRef, useState } from "react";
import { RandomWords } from "../utils/random-words.ts";
import { Word } from "./word.tsx";
import { useWordContext } from "../context/word-store-context.ts";
import { Counter } from "./counter.tsx";
import { useKeyboardEvent } from "../events/keyboard.tsx";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Timer } from "../utils/timer.ts";
import { info } from "../utils/logger.ts";
import { SpeedResult } from "../utils/speed-result.ts";

export const TypingTest = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const [isFocus, setIsFocus] = useState(true);
  const blurTimeoutRef = useRef<number | null>(0);

  const inputWord = useWordContext((state) => state.inputWord);
  const setInputWord = useWordContext((state) => state.setInputWord);
  const currentWordIndex = useWordContext((state) => state.currentWordIndex);
  const setCurrentWordIndex = useWordContext(
    (state) => state.setCurrentWordIndex,
  );
  const typedWords = useWordContext((state) => state.typedWords);
  const setTypedWords = useWordContext((state) => state.setTypedWords);
  const setResult = useWordContext((state) => state.setResult);
  const difficulty = useWordContext((state) => state.difficulty);
  const state = useWordContext((state) => state.state);
  const setState = useWordContext((state) => state.setState);

  const correct = useWordContext((state) => state.correct);
  const incorrect = useWordContext((state) => state.incorrect);

  info("state: ", state);

  const [randomWords, setRandomWords] = useState<string[]>([]);

  const timer = Timer.instance;

  const wordRef = useRef<HTMLDivElement | null>(null);

  const handleReloadTest = useCallback(
    (
      words: string[] = RandomWords.setDifficulty(difficulty)
        .getRandomWords(30)
        .join(" ")
        .split(" "),
    ) => {
      setRandomWords(() => words);
      setInputWord("");
      setCurrentWordIndex(0);
      setTypedWords([]);
      setState("IDLE");
      timer?.reset();
      setResult({ wpm: 0, raw: 0, acc: 0 });
    },
    [
      difficulty,
      setCurrentWordIndex,
      setInputWord,
      setTypedWords,
      setResult,
      setState,
      timer,
    ],
  );

  useEffect(() => {
    const words = RandomWords.setDifficulty(difficulty)
      .getRandomWords(30)
      .join(" ")
      .split(" ");

    handleReloadTest(words);

    // const changeDifficult = () => {
    //   setRandomWords(words);
    //   setInputWord("");
    //   setCurrentWordIndex(0);
    //   setTypedWords([]);
    //   setState("IDLE");
    //   timer?.reset();
    //   setResult({ wpm: 0, raw: 0, acc: 0 });
    // };
    // changeDifficult();
  }, [difficulty, handleReloadTest]);

  const keyboardEvent = useKeyboardEvent({
    inputRef,
    randomWords,
  });

  useEffect(() => {
    window.addEventListener("keydown", keyboardEvent.onFocus);
    return () => {
      window.removeEventListener("keydown", keyboardEvent.onFocus);
    };
  }, [keyboardEvent.onFocus]);

  useEffect(() => {
    if (!timer) return;

    // START timer when entering PLAY
    if (state === "PLAYING" && timer.state !== "PLAY") {
      timer.start();
      info("timer started:", timer.startTime);
    }

    // FINISH when all words typed
    const allWordsTyped =
      typedWords.length === randomWords.length && typedWords.length > 0;

    if (state === "PLAYING" && allWordsTyped) {
      if (timer.state !== "FINISHED") {
        timer.stop();
        setState("FINISHED");

        const result = new SpeedResult(
          typedWords,
          randomWords,
          correct,
          incorrect,
        ).compute();

        setResult({ wpm: result.wpm, raw: result.raw, acc: result.acc });

        info("timer stopped:", timer.endTime);
      }
    }
  }, [
    state,
    setState,
    typedWords,
    timer,
    randomWords,
    setResult,
    correct,
    incorrect,
  ]);

  useEffect(() => {
    const wordCurrent = document.querySelector(".active");
    wordCurrent?.scrollIntoView();
  }, [typedWords, randomWords, currentWordIndex]);

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
        onKeyDown={() => {
          if (state === "IDLE") setState("PLAYING");
        }}
        onFocus={() => {
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
          }
          setIsFocus(true);
        }}
        onBlur={() => {
          blurTimeoutRef.current = setTimeout(() => {
            if (state === "FINISHED") return;
            setIsFocus(false);
          }, 1000);
        }}
        autoComplete="off"
      />
      <div className="absolute hidden">{inputWord}</div>
      <Counter
        typedWordsLength={typedWords.length}
        randomWordsLength={randomWords.length}
        className={isFocus ? "opacity-100" : "opacity-0"}
      />
      <div
        id="letter"
        className={`${isFocus ? "blur-0" : "blur-sm"} max-h-32 overflow-hidden duration-100 flex flex-wrap`}
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
              ref={wordRef}
            />
          );
        })}
      </div>
      <button
        onClick={() => handleReloadTest()}
        className="self-center z-10 p-5"
      >
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
