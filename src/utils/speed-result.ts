export class SpeedResult {
  // WPM = (Total Words) / (Total Minutes)
  totalWords: number;
  totalMinutes: number;

  constructor(totalWords: number, totalMinutes: number) {
    this.totalWords = totalWords;
    this.totalMinutes = totalMinutes;
  }

  public calculateWpm(): number {
    return this.totalWords / this.totalMinutes;
  }
}
