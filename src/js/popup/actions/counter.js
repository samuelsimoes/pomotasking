import uuid from 'uuid/v1'
import * as actions from '../constants/actionTypes'
import * as runningItemRepository from '../../repositories/runningItem'
import * as taskStatuses from '../../constants/taskStatuses'
import * as runnableTypes from '../../constants/runnableTypes'
import * as tasksRepository from '../../repositories/tasks'
import * as runtimeEvents from '../../utils/runtimeEvents'

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
    let runningItem = getStore().runningItem
    let now = new Date()

    dispatch({
      type: actions.FINISH_CURRENT_ITEM,
      now: now
    })

    if (runningItem && runningItem.type === runnableTypes.TASK) {
      tasksRepository.persistTask({
        id: runningItem.id,
        listID: runningItem.listID,
        finishedAt: now,
        status: taskStatuses.FINISHED
      })
    }

    runningItemRepository.persist(null)

    runtimeEvents.stopBadgeCounter()
  }
}

export function cancelItem () {
  return function (dispatch, getStore) {
    let runningItem = getStore().runningItem

    dispatch({
      type: actions.CANCEL_CURRENT_ITEM
    })

    if (runningItem && runningItem.type === runnableTypes.TASK) {
      tasksRepository.persistTask({
        id: runningItem.id,
        listID: runningItem.listID,
        startedAt: null,
        status: taskStatuses.WAITING
      })
    }

    runningItemRepository.persist(null)

    runtimeEvents.stopBadgeCounter()
  }
}
