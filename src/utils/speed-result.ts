export class SpeedResult {
  // WPM = (Total Words) / (Total Minutes)
  totalWords: number;
  startTime: number;
  endTime: number;

  constructor(
    totalWords: number = 0,
    initialStartTime: number = 0,
    initialEndTime: number = 0,
  ) {
    this.totalWords = totalWords;
    this.startTime = initialStartTime;
    this.endTime = initialEndTime;
  }

  public result() {
    return this.calculateWpm(this.totalWords, this.timeElapsedMs() / 60000);
  }

  private timeElapsedMs() {
    return this.endTime - this.startTime;
  }

  private calculateWpm(totalWords: number, totalMinutes: number) {
    return totalWords / totalMinutes;
  }
}
