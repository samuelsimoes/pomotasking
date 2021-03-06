import * as actions from '../constants/actionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case actions.BUILD_NEW_TASK_LIST:
      return state.concat([{ id: action.id, editing: true }])
    case actions.UPDATE_TASK_LIST:
      return state.map(list => {
        return (list.id === action.id) ? { ...list, ...action.data } : list
      })
    case actions.SUBMIT_EDIT_TASK_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: false, name: list.intended_name }
        } else {
          return list
        }
      })
    case actions.CANCEL_EDIT_TASK_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: false }
        } else {
          return list
        }
      })
    case actions.START_EDIT_TASK_LIST:
      return state.map(list => {
        if (list.id === action.id) {
          return { ...list, editing: true, intended_name: list.name }
        } else {
          return list
        }
      })
    case actions.DESTROY_TASK_LIST:
      return state.filter(list => list.id !== action.id)
    default:
      return state
  }
}
