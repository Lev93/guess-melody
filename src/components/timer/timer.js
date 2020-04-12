class Timer {
  constructor(func) {
    this.func = func;
  }

  startTimer() {
    this.timer = setInterval(() => this.func(), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
}

export default Timer;
