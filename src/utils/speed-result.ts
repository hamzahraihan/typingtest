import { info } from "./logger.ts";
import { Timer } from "./timer.ts";

export class SpeedResult {
  // WPM = Correct Words / Total Minutes
  private typedWords: string[] = [];
  private timer: Timer = Timer.instance;
  private generatedWords: string[] = [];
  private correctChars: number = 0;
  private incorrectChars: number = 0;

  constructor(
    words: string[] = [],
    generatedWords: string[] = [],
    correctChars: number = 0,
    incorrectChars: number = 0,
    timer: Timer = Timer.instance,
  ) {
    this.typedWords = words;
    this.generatedWords = generatedWords;
    this.timer = timer;
    this.correctChars = correctChars;
    this.incorrectChars = incorrectChars;
  }

  public compute() {
    const wpm = this.countWpm();
    const raw = this.countRaw();
    const acc = this.countAccuracy();

    const result = { wpm, raw, acc };

    return result;
  }

  private countWpm() {
    const timeInSeconds = this.timer.getElapsedSeconds();
    if (timeInSeconds <= 0) return 0;

    const count = (this.correctWords().length / timeInSeconds) * 60;
    return Number(count.toFixed(2));
  }

  private countRaw() {
    const timeInSeconds = this.timer.getElapsedSeconds();
    if (timeInSeconds <= 0) return 0;

    const count = (this.typedWords.length / timeInSeconds) * 60;
    return Number(count.toFixed(2));
  }

  private countAccuracy() {
    const total = this.correctChars + this.incorrectChars;
    if (total === 0) return 0;

    return (this.correctChars / total) * 100;
  }

  private correctWords(): string[] {
    const correctTypedChars = this.typedWords.filter(
      (typed, i) => typed === this.generatedWords[i],
    );
    info("correct chars: ", correctTypedChars);

    return correctTypedChars;
  }

  public reset() {
    this.typedWords = [];
    this.generatedWords = [];
  }
}
