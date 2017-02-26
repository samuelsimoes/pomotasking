import runningItemInfos from './runningItemInfos'
import * as runnableTypes from '../constants/runnableTypes'

test('returns the correct infos to pomodoro', () => {
  expect(runningItemInfos(
    { getTime: () => 1000 },
    runnableTypes.POMODORO,
    { getTime: () => 3000 },
    { pomodoroLength: 10 }
  )).toEqual({
    late: false,
    leftTimeInSeconds: 598,
    elapsedTime: 2
  })
})

test('returns the correct infos to short pause', () => {
  expect(runningItemInfos(
    { getTime: () => 1000 },
    runnableTypes.SHORT_PAUSE,
    { getTime: () => 3000 },
    { shortPauseLength: 5 }
  )).toEqual({
    late: false,
    leftTimeInSeconds: 298,
    elapsedTime: 2
  })
})

test('returns the correct infos to long pause', () => {
  expect(runningItemInfos(
    { getTime: () => 1000 },
    runnableTypes.LONG_PAUSE,
    { getTime: () => 3000 },
    { longPauseLength: 6 }
  )).toEqual({
    late: false,
    leftTimeInSeconds: 358,
    elapsedTime: 2
  })
})
