export class Timer {
  private static _instance: Timer | null = null;
  state: "PLAY" | "IDLE" | "FINISHED" = "IDLE";
  startTime: number = 0;
  endTime: number = 0;

  private constructor() {}

  public static get instance(): Timer {
    if (!this._instance) {
      this._instance = new Timer();
    }

    return this._instance;
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
