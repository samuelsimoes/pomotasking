import * as runnableTypes from '../constants/runnableTypes'

export default function (startedAt, itemType, now = new Date()) {
  let timeToFinish = {
    [runnableTypes.SHORT_PAUSE]: 300,
    [runnableTypes.LONG_PAUSE]: 900,
    [runnableTypes.POMODORO]: 1500
  }[itemType]

  let elapsedTimeInSeconds = (((now.getTime()) - (startedAt.getTime())) / 1000)

  return {
    late: (elapsedTimeInSeconds > timeToFinish),
    leftTimeInSeconds: (timeToFinish - elapsedTimeInSeconds),
    elapsedTime: elapsedTimeInSeconds
  }
}
