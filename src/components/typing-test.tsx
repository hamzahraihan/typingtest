import { useCallback, useEffect, useMemo } from "react";
import { RandomWords } from "../utils/random-words.ts";
import { Word } from "./word.tsx";
import { useWordContext } from "../context/word-store-context.ts";

export const TypingTest = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  // const [inputWord, setInputWord] = useState<string>("");
  // const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // console.log(currentWordIndex);
  // const [typedWords, setTypedWords] = useState<string[]>([]);
  // console.log(typedWords);

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
          setCurrentWordIndex(currentWordIndex + 1);
          console.log(
            "now onto the next word: ",
            randomWords[currentWordIndex],
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
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
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
  );
};
