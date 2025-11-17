export class Timer {
  state: "PLAY" | "IDLE" | "FINISHED";
  startTime: number | null = null;
  endTime: number | null = null;

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
