import * as actions from '../constants/actionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case actions.BUILD_NEW_POMODORO_LIST:
      return state.concat([{ id: action.id, editing: true }])
    case actions.CHOOSE_POMODORO_LIST:
      return state.map(list => {
        let data = list

        if (list.active) {
          data = { ...data, active: false }
        }

        if (list.id === action.id) {
          data = { ...data, active: true }
        }

        return data
      })
    case actions.UPDATE_POMODORO_LIST:
      return state.map(list => {
        return (list.id === action.id) ? { ...list, ...action.data } : list
      })
    case actions.SUBMIT_EDIT_POMODORO_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: false, name: list.intended_name }
        } else {
          return list
        }
      })
    case actions.CANCEL_EDIT_POMODORO_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: false }
        } else {
          return list
        }
      })
    case actions.START_EDIT_POMODORO_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: true, intended_name: list.name }
        } else {
          return list
        }
      })
    case actions.DESTROY_POMODORO_LIST:
      return state.filter(list => list.id !== action.id)
    default:
      return state
  }
}
