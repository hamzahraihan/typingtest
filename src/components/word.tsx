export const Word = ({
  word,
  isCurrent,
  inputWord,
  typedWords,
  currentWordIndex,
  index,
}: {
  word: string;
  isCurrent: boolean;
  inputWord: string;
  typedWords: string[];
  currentWordIndex: number;
  index: number;
}) => {
  return (
    <div className="m-1">
      {word.split("").map((letter, j) => {
        let className = "";
        if (isCurrent && inputWord[j] === letter) {
          className = "text-black";
        }
        if (isCurrent && inputWord[j] != letter) {
          className = "text-red-500";
        }
        if (inputWord[j] == undefined) {
          className = "opacity-20";
        }

        if (!isCurrent && typedWords[index]) {
          className =
            typedWords[index][j] === letter ? "text-black" : "text-red-500";
        }

        if (index > currentWordIndex) {
          className = "opacity-20";
        }
        return (
          <span key={j} data-letterindex={j} className={className}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};
