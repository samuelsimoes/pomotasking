import * as actions from '../constants/actionTypes'
import uuid from 'uuid/v1'
import * as pomodorosRepository from '../../repositories/pomodoros'
import * as runningItemRepository from '../../repositories/runningItem'
import * as pomodoroStatuses from '../../constants/pomodoroStatuses'
import * as runtimeEvents from '../../utils/runtimeEvents'
import { finishItem } from './counter'

export function updateWaitingPomodorosOrder (intendedWaitingOrder) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.UPDATE_WAITING_POMODOROS_ORDER,
      intendedWaitingOrder
    })

    let state = getStore()

    pomodorosRepository.persistPomodoros(state.currentListID, state.pomodoros)
  }
}

export function newPomodoro (description) {
  let id = uuid()

  return function (dispatch, getStore) {
    dispatch({
      type: actions.NEW_POMODORO,
      description,
      now: new Date(),
      id
    })

    let pomodoroData = getStore().pomodoros.find(pomodoro => pomodoro.id === id)

    pomodorosRepository.persistPomodoro(pomodoroData)
  }
}

export function update (id, data) {
  return function (dispatch) {
    dispatch({
      type: actions.UPDATE_POMODORO,
      id,
      data
    })
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

    let runningItem = getStore().runningItem

    runningItemRepository.persist(runningItem)

    pomodorosRepository.persistPomodoro({
      id: id,
      listID: runningItem.listID,
      startedAt: new Date(),
      status: pomodoroStatuses.RUNNING
    })

    runtimeEvents.startBadgeCounter()
  }
}

export function destroy (id) {
  return function (dispatch, getStore) {
    dispatch({
      type: actions.DESTROY_POMODORO,
      id
    })

    pomodorosRepository.deletePomodoro(getStore().currentListID, id)
  }
}
