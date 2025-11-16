export class SpeedResult {
  // WPM = (Total Words) / (Total Minutes)
  totalWords: number;
  totalMinutes: number;

  constructor(totalWords: number, totalMinutes: number) {
    this.totalWords = totalWords;
    this.totalMinutes = totalMinutes;
  }

  public result() {
    return this.calculateWpm(this.totalWords, this.totalMinutes);
  }

  private calculateWpm(totalWords: number, totalMinutes: number) {
    return totalWords / totalMinutes;
  }
}
