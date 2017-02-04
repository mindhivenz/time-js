import extendClock from './extendClock'


export default () => {
  const initialTime = new Date()
  let testTime = initialTime

  const clock = () => testTime

  clock.adjust = (func) => {
    testTime = func(testTime)
    return testTime
  }
  clock.sleep = (milliseconds) => {
    clock.adjust(time => new Date(time + milliseconds))
    return Promise.resolve()
  }
  clock.totalAdjustedMs = () =>
    testTime - initialTime

  extendClock(clock)

  return { clock }
}
