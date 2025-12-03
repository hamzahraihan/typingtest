import { useWordContext } from "../context/word-store-context.ts";
import { RandomWords } from "./random-words.ts";
import { Timer } from "./timer.ts";

export default function Reset() {
  const timer = Timer.instance;

  const {
    setRandomWords,
    setCurrentWordIndex,
    setInputWord,
    setTypedWords,
    setState,
    setResult,
  } = useWordContext((state) => state);

  return () => {
    setRandomWords(RandomWords.getRandomWords(30).join(" ").split(" "));
    setInputWord("");
    setCurrentWordIndex(0);
    setTypedWords([]);
    setState("IDLE");
    timer?.reset();
    setResult({ wpm: 0, raw: 0, acc: 0 });
  };
}
