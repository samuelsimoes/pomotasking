import * as actions from '../constants/actionTypes'
import uuid from 'uuid/v1'
import * as tasksRepository from '../../repositories/tasks'
import * as runningItemRepository from '../../repositories/runningItem'
import * as runtimeEvents from '../../utils/runtimeEvents'
import { finishItem } from './counter'

export function toggleFinish (id) {
  return function (dispatch, getStore) {
    let state = getStore()

    if (state.runningItem && state.runningItem.id === id) {
      dispatch(finishItem())
    }

    dispatch({
      type: actions.TOGGLE_FINISH_TASK,
      now: new Date(),
      id
    })

    state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)
  }
}

export function updateOpenedTasksOrder (intendedOpenedOrder) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.UPDATE_OPEN_TASKS_ORDER,
      intendedOpenedOrder
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

    let state = getStore()

    tasksRepository.persistTasks(state.currentListID, state.tasks)
  }
}

export function start (id) {
  return function (dispatch, getStore) {
    dispatch(finishItem())

    dispatch({
      type: actions.START_POMODORO,
      now: new Date(),
      id
    })

    let state = getStore()

    runningItemRepository.persist(state.runningItem)

    tasksRepository.persistTasks(state.currentListID, state.tasks)

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
