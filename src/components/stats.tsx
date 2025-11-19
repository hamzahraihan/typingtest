import { useWordContext } from "../context/word-store-context.ts";

function WordStatus({
  randomWordsLength,
  typedWordsLength,
  className,
}: {
  randomWordsLength: number;
  typedWordsLength: number;
  className?: string;
}) {
  const wpm = useWordContext((state) => state.wpm);
  return (
    <div>
      <div
        className={
          "px-1 text-3xl text-gray-600 duration-200 transition-all " + className
        }
      >
        {typedWordsLength}/{randomWordsLength}
      </div>
      <div>WPM: {wpm.toFixed(0)}</div>
    </div>
  );
}

export { WordStatus };
