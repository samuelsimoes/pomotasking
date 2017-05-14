import * as actions from '../constants/actionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case actions.BUILD_NEW_TASK_LIST:
      return state.concat([{ id: action.id, editing: true }])
    case actions.UPDATE_TASK_LIST:
      return state.map(list => {
        return (list.id === action.id) ? { ...list, ...action.data } : list
      })
    case actions.DESTROY_TASK_LIST:
      return state.filter(list => list.id !== action.id)
    default:
      return state
  }
}
