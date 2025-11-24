import { Timer } from "./timer.ts";

export class SpeedResult {
  // WPM = Correct Words / Total Minutes
  correctWords: number;
  timer: Timer;

  constructor(correctWords: number = 0, timer: Timer) {
    this.correctWords = correctWords;
    this.timer = timer;
  }

  public result() {
    const timeInSeconds = this.timer.getElapsedSeconds();
    if (timeInSeconds <= 0) return 0;

    const wpm = (this.correctWords / timeInSeconds) * 60;
    return Number(wpm.toFixed(2));
  }
}
