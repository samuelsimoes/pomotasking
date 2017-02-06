import * as actions from '../constants/actionTypes'
import * as pomodoroStatuses from '../../constants/pomodoroStatuses'

function finishedPomodoro (todo, now) {
  return {
    ...todo,
    finishedAt: now,
    status: pomodoroStatuses.FINISHED
  }
}

function listWithNewPomodoro (state, currentListID, data) {
  let notWaitingPomodoros =
      state.filter(pomodoro => pomodoro.status !== pomodoroStatuses.WAITING)

  let waitingPomodoros =
    state.filter(pomodoro => pomodoro.status === pomodoroStatuses.WAITING)

  return (
    notWaitingPomodoros
      .concat([{
        id: data.id,
        description: data.description,
        addedAt: data.now,
        status: pomodoroStatuses.WAITING,
        listID: currentListID
      }])
      .concat(waitingPomodoros)
  )
}

export default function (state, currentListID, currentRunningItemID, action) {
  switch (action.type) {
    case actions.UPDATE_POMODORO:
      return state.map(pomodoro => {
        return (pomodoro.id === action.id) ? { ...pomodoro, ...action.data } : pomodoro
      })
    case actions.NEW_POMODORO:
      return listWithNewPomodoro(state, currentListID, action)
    case actions.DESTROY_POMODORO:
      return state.filter(pomodoro => pomodoro.id !== action.id)
    case actions.FINISH_CURRENT_ITEM:
      return state.map(pomodoro =>
        (pomodoro.id === currentRunningItemID) ? finishedPomodoro(pomodoro, action.now) : pomodoro
      )
    case actions.START_POMODORO:
      return state.map(pomodoro => {
        let data = pomodoro

        if (pomodoro.id !== action.id && pomodoro.status === pomodoroStatuses.RUNNING) {
          data = { ...data, startedAt: null, status: pomodoroStatuses.WAITING }
        }

        if (pomodoro.id === action.id) {
          data = {
            ...data,
            startedAt: action.now,
            status: pomodoroStatuses.RUNNING
          }
        }

        return data
      })
    case actions.CANCEL_CURRENT_ITEM:
      return state.map(pomodoro => {
        let data = pomodoro

        if (pomodoro.id === currentRunningItemID && pomodoro.status === pomodoroStatuses.RUNNING) {
          data = { ...data, startedAt: null, status: pomodoroStatuses.WAITING }
        }

        return data
      })
    case actions.LOADED_POMODOROS:
      return action.pomodoros
    case actions.UPDATE_WAITING_POMODOROS_ORDER:
      let notWaitingPomodoros =
        state.filter(pomodoro => pomodoro.status !== pomodoroStatuses.WAITING)

      let orderedWaitingPomodoros =
        action.intendedWaitingOrder.map(pomodoroID =>
          state.find(pomodoro => pomodoro.id === pomodoroID)
        )

      return notWaitingPomodoros.concat(orderedWaitingPomodoros)
    default:
      return state
  }
}
