import * as actions from '../constants/actionTypes'
import uuid from 'uuid/v1'
import * as tasksRepository from '../../repositories/tasks'
import * as runningItemRepository from '../../repositories/runningItem'
import * as taskStatuses from '../../constants/taskStatuses'
import * as runtimeEvents from '../../utils/runtimeEvents'
import { finishItem } from './counter'

export function updateWaitingTasksOrder (intendedWaitingOrder) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.UPDATE_WAITING_TASK_ORDER,
      intendedWaitingOrder
    })

    let state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)
  }
}

export function newTask (description) {
  let id = uuid()

  return function (dispatch, getStore) {
    dispatch({
      type: actions.NEW_TASK,
      description,
      now: new Date(),
      id
    })

    let state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)
  }
}

export function update (id, data) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.UPDATE_TASK,
      id,
      data
    })

    tasksRepository.persistTask(getStore().tasks.find(task => task.id === id))
  }
}

export function start (id) {
  return function (dispatch, getStore) {
    dispatch(finishItem())

    dispatch({
      type: actions.START_TASK,
      now: new Date(),
      id
    })

    let runningItem = getStore().runningItem

    runningItemRepository.persist(runningItem)

    tasksRepository.persistTask({
      id: id,
      listID: runningItem.listID,
      startedAt: new Date(),
      status: taskStatuses.RUNNING
    })

    runtimeEvents.startBadgeCounter()
  }
}

export function destroy (id) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.DESTROY_TASK,
      id
    })

    tasksRepository.deleteTask(getStore().currentListID, id)
  }
}
