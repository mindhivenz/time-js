import { clock as defaultClock } from './index'


export default class ProgressiveBackoff {

  constructor({
    initialMs = 1,
    collisionAvoidanceMaxRandomMs = 500,
    retryMultiplier = 2,
    maxMs = 10 * 60 * 1000,
    clock = defaultClock,
  } = {}) {
    this.initialMs = Math.max(initialMs, 1)
    this.collisionAvoidanceMaxRandomMs = collisionAvoidanceMaxRandomMs
    this.retryMultiplier = retryMultiplier
    this.maxMs = maxMs
    this.clock = clock
    this.baseDelayMs = this.initialMs
  }

  async sleep() {
    const delayMs = this.baseDelayMs + (this.collisionAvoidanceMaxRandomMs * Math.random())
    this.baseDelayMs = delayMs * this.retryMultiplier
    if (this.maxMs && this.baseDelayMs > this.maxMs) {
      this.baseDelayMs = this.maxMs
    }
    await this.clock.sleep(delayMs)
  }

  reset() {
    this.baseDelayMs = this.initialMs
  }
}

