function WordStatus({
  randomWordsLength,
  typedWordsLength,
  className,
}: {
  randomWordsLength: number;
  typedWordsLength: number;
  className?: string;
}) {
  return (
    <div
      className={
        "px-1 text-3xl text-gray-600 duration-200 transition-all " + className
      }
    >
      {typedWordsLength}/{randomWordsLength}
    </div>
  );
}

export { WordStatus };
