import * as actions from '../constants/actionTypes'
import * as runnableTypes from '../../constants/runnableTypes'

export default function (state = null, tasks, action) {
  switch (action.type) {
    case actions.START_TASK:
      let runningTask = tasks.find(task => task.id === action.id)

      return {
        id: runningTask.id,
        type: runnableTypes.TASK,
        description: runningTask.description,
        startedAt: action.now,
        listID: runningTask.listID
      }
    case actions.DESTROY_TASK_LIST:
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
