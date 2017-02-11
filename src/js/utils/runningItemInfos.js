import * as runnableTypes from '../constants/runnableTypes'
import * as configsRepository from '../repositories/configs'

export default function (startedAt, itemType, now = new Date()) {
  let configs = configsRepository.get()

  let timeToFinish = {
    [runnableTypes.SHORT_PAUSE]: configs.shortPauseLength * 60,
    [runnableTypes.LONG_PAUSE]: configs.longPauseLength * 60,
    [runnableTypes.POMODORO]: configs.pomodoroLength * 60
  }[itemType]

  let elapsedTimeInSeconds = (((now.getTime()) - (startedAt.getTime())) / 1000)

  return {
    late: (elapsedTimeInSeconds > timeToFinish),
    leftTimeInSeconds: (timeToFinish - elapsedTimeInSeconds),
    elapsedTime: elapsedTimeInSeconds
  }
}
