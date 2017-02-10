import uuid from 'uuid/v1'
import * as actions from '../constants/actionTypes'
import * as runningItemRepository from '../../repositories/runningItem'
import * as runnableTypes from '../../constants/runnableTypes'
import * as tasksRepository from '../../repositories/tasks'
import * as runtimeEvents from '../../utils/runtimeEvents'
import taskReducer from '../reducers/tasks'

export function startPause (pauseType) {
  let id = uuid()

  return function (dispatch, getStore) {
    dispatch(finishItem())

    dispatch({
      type: actions.START_PAUSE,
      now: new Date(),
      pauseType,
      id
    })

    runningItemRepository.persist(getStore().runningItem)

    runtimeEvents.startBadgeCounter()
  }
}

export function finishItem () {
  return function (dispatch, getStore) {
    let state = getStore()
    let runningItem = state.runningItem
    let now = new Date()

    dispatch({
      type: actions.FINISH_CURRENT_ITEM,
      now: now
    })

    if (runningItem &&
        runningItem.type === runnableTypes.POMODORO &&
        runningItem.listID !== state.currentListID) {
      let list = tasksRepository.getTasks(runningItem.listID)

      list = taskReducer(list, null, runningItem.id, {
        type: actions.FINISH_CURRENT_ITEM,
        now: now
      })

      tasksRepository.persistTasks(runningItem.listID, list)
    }

    state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)

    runningItemRepository.persist(null)

    runtimeEvents.stopBadgeCounter()
  }
}

export function cancelItem () {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.CANCEL_CURRENT_ITEM
    })

    let state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)

    runningItemRepository.persist(null)

    runtimeEvents.stopBadgeCounter()
  }
}
