import * as actions from '../constants/actionTypes'
import * as pomodorosRepository from '../../repositories/pomodoros'
import * as listsRepository from '../../repositories/lists'
import { finishItem } from './counter'
import uuid from 'uuid/v1'

export function startEdit (id) {
  return {
    type: actions.START_EDIT_POMODORO_LIST,
    id
  }
}

export function buildList () {
  let id = uuid()

  return {
    type: actions.BUILD_NEW_POMODORO_LIST,
    id
  }
}

export function cancelEdit (id) {
  return {
    type: actions.CANCEL_EDIT_POMODORO_LIST,
    id
  }
}

export function submitEdit (id) {
  return function (dispatch, getStore) {
    let editedList = getStore().lists.find(list => list.id === id)
    let newItem = !editedList.name

    dispatch({
      type: actions.SUBMIT_EDIT_POMODORO_LIST,
      id
    })

    editedList = getStore().lists.find(list => list.id === id)

    listsRepository.persistList(editedList)

    if (newItem) {
      dispatch(choose(id))
    }
  }
}

export function update (id, data) {
  return {
    type: actions.UPDATE_POMODORO_LIST,
    id,
    data
  }
}

export function destroy (id) {
  return function (dispatch, getStore) {
    let state = getStore()
    let activeListID = state.currentListID
    let runningItem = state.runningItem

    if (runningItem && runningItem.listID === id) {
      dispatch(finishItem())
    }

    dispatch({
      type: actions.DESTROY_POMODORO_LIST,
      id
    })

    listsRepository.deleteList(id)

    let firstList = getStore().lists[0]

    if (firstList && activeListID === id) {
      dispatch(choose(firstList.id))
    }
  }
}

export function loadedPomodoros (pomodoros) {
  return {
    type: actions.LOADED_POMODOROS,
    pomodoros
  }
}

export function choose (id) {
  let pomodoros = pomodorosRepository.getPomodoros(id)

  return function (dispatch, getStore) {
    let previousActiveList = getStore().lists.find(list => list.active)

    if (previousActiveList) {
      listsRepository.persistList({ id: previousActiveList.id, active: false })
    }

    dispatch({
      type: actions.CHOOSE_POMODORO_LIST,
      id
    })

    dispatch(loadedPomodoros(pomodoros))

    listsRepository.persistList({ id, active: true })
  }
}
