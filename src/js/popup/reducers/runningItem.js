import * as actions from '../constants/actionTypes'
import * as runnableTypes from '../../constants/runnableTypes'

export default function (state = null, pomodoros, action) {
  switch (action.type) {
    case actions.START_POMODORO:
      let runningPomodoro = pomodoros.find(pomodoro => pomodoro.id === action.id)

      return {
        id: runningPomodoro.id,
        type: runnableTypes.POMODORO,
        description: runningPomodoro.description,
        startedAt: action.now,
        listID: runningPomodoro.listID
      }
    case actions.DESTROY_POMODORO_LIST:
      if (state && state.listID === action.id) {
        return null
      } else {
        return state
      }
    case actions.START_PAUSE:
      return {
        id: action.id,
        type: action.pauseType,
        description: {
          [runnableTypes.SHORT_PAUSE]: 'Short Pause',
          [runnableTypes.LONG_PAUSE]: 'Long Pause'
        }[action.pauseType],
        startedAt: action.now
      }
    case actions.FINISH_CURRENT_ITEM:
    case actions.CANCEL_CURRENT_ITEM:
      return null
    default:
      return state
  }
}
