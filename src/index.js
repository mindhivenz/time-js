

export const clock = () => new Date()

clock.sleep = milliseconds =>
  new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })
