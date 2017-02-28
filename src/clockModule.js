import extendClock from './extendClock'


export default () => {
  const clock = () => new Date()
  return {
    clock: extendClock(clock),
  }
}
