import extendClock from './extendClock'


const clock = () => new Date()

export default () => ({
  clock: extendClock(clock),
})
