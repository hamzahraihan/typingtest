export class Timer {
  state: "PLAY" | "IDLE" | "FINISHED";
  startTime: number = 0;
  endTime: number = 0;

  constructor(initialState: "PLAY" | "IDLE" | "FINISHED" = "IDLE") {
    this.state = initialState;
  }

  public start() {
    if (this.state === "IDLE") {
      this.startTime = performance.now();
      this.state = "PLAY";
    }
  }

  public stop() {
    if (this.state === "PLAY") {
      this.endTime = performance.now();
      this.state = "FINISHED";
    }
  }

  public reset() {
    this.state = "IDLE";
    this.startTime = 0;
    this.endTime = 0;
  }

  public getElapsedSeconds() {
    if (this.state === "PLAY") {
      return (performance.now() - this.startTime) / 1000;
    }
    if (this.state === "FINISHED") {
      return (this.endTime - this.startTime) / 1000;
    }
    return 0;
  }
}
