import { Timer } from "./timer.ts";

export class SpeedResult {
  // WPM = (Total Words) / (Total Minutes)
  totalCharacters: number;
  timer: Timer;

  constructor(initialTotalCharacters: number = 0, timer: Timer) {
    this.totalCharacters = initialTotalCharacters;
    this.timer = timer;
  }

  public result() {
    const timeInSeconds = this.timer.getElapsedSeconds();
    if (timeInSeconds <= 0) return 0;

    // add 30 characters for spaces since the typed word does not input spaces
    const wordsTyped = (this.totalCharacters + 30) / 5;
    const wpm = (wordsTyped / timeInSeconds) * 60; // normalize to 1 minute

    return Number(wpm.toFixed(2));
  }
}
