export function presentFullDuration (duration) {
  if (!duration) { return '00:00' }

  duration = Math.abs(parseInt(duration, 10))

  let hours = Math.floor(duration / 3600)
  let minutes = parseInt((duration / 60), 10)
  let seconds = ((duration - (hours * 3600)) % 60)

  if (minutes < 10) { minutes = '0' + minutes }
  if (seconds < 10) { seconds = '0' + seconds }

  return `${minutes}:${seconds}`
}

export function presentMinutesDuration (duration) {
  return Math.abs(parseInt((duration / 60), 10)).toString()
}
