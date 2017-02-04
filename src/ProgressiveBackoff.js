import { app } from '@mindhive/di'


export default class ProgressiveBackoff {

  constructor({
    initialMs = 1,
    collisionAvoidanceMaxRandomMs = 500,
    retryMultiplier = 2,
    maxMs = 10 * 60 * 1000,
  } = {}) {
    this.initialMs = Math.max(initialMs, 1)
    this.collisionAvoidanceMaxRandomMs = collisionAvoidanceMaxRandomMs
    this.retryMultiplier = retryMultiplier
    this.maxMs = maxMs
    this.reset()
  }

  async sleep() {
    const { clock } = app()
    const delayMs = this.baseDelayMs + (this.collisionAvoidanceMaxRandomMs * Math.random())
    this.baseDelayMs = delayMs * this.retryMultiplier
    if (this.maxMs && this.baseDelayMs > this.maxMs) {
      this.baseDelayMs = this.maxMs
    }
    await clock.sleep(delayMs)
  }

  reset() {
    this.baseDelayMs = this.initialMs
  }
}

