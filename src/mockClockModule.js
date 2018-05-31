import dateClone from 'date-fns/parse'
import addMilliseconds from 'date-fns/add_milliseconds'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'


export default () => {
  const initialTime = new Date()
  let testTime = initialTime

  const clock = () => dateClone(testTime)

  clock.adjust = (func) => {
    testTime = dateClone(func(dateClone(testTime)))
    return clock()
  }
  clock.sleep = (milliseconds) => {
    clock.adjust(time => addMilliseconds(time, milliseconds))
    return Promise.resolve()
  }
  clock.totalAdjustedMs = () =>
    differenceInMilliseconds(testTime, initialTime)
  return { clock }
}
