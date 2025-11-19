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
}
