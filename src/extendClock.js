

export default (clock) => {
  if (typeof clock.sleep === 'undefined') {
    clock.sleep = milliseconds =>
      new Promise(resolve =>
        setTimeout(resolve, milliseconds)
      )
  }
  return clock
}
