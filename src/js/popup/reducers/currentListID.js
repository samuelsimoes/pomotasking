import * as actions from '../constants/actionTypes'

export default function currentListIDReducer (state, action) {
  if (action.type === actions.CHOOSE_POMODORO_LIST) {
    return action.id
  } else if (action.type === actions.DESTROY_POMODORO_LIST && state === action.id) {
    return null
  } else {
    return state
  }
}
