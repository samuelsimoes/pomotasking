import * as actions from '../constants/actionTypes'
import * as taskStatuses from '../../constants/taskStatuses'

function finishedTask (todo, now) {
  return {
    ...todo,
    finishedAt: now,
    status: taskStatuses.FINISHED
  }
}

function listWithNewTask (state, currentListID, data) {
  let notWaitingTasks =
      state.filter(task => task.status !== taskStatuses.WAITING)

  let waitingTasks =
    state.filter(task => task.status === taskStatuses.WAITING)

  return (
    notWaitingTasks
      .concat([{
        id: data.id,
        description: data.description,
        addedAt: data.now,
        status: taskStatuses.WAITING,
        listID: currentListID
      }])
      .concat(waitingTasks)
  )
}

export default function (state, currentListID, currentRunningItemID, action) {
  switch (action.type) {
    case actions.UPDATE_TASK:
      return state.map(task => {
        return (task.id === action.id) ? { ...task, ...action.data } : task
      })
    case actions.NEW_TASK:
      return listWithNewTask(state, currentListID, action)
    case actions.DESTROY_TASK:
      return state.filter(task => task.id !== action.id)
    case actions.FINISH_CURRENT_ITEM:
      return state.map(task =>
        (task.id === currentRunningItemID) ? finishedTask(task, action.now) : task
      )
    case actions.START_TASK:
      return state.map(task => {
        let data = task

        if (task.id !== action.id && task.status === taskStatuses.RUNNING) {
          data = { ...data, startedAt: null, status: taskStatuses.WAITING }
        }

        if (task.id === action.id) {
          data = {
            ...data,
            startedAt: action.now,
            status: taskStatuses.RUNNING
          }
        }

        return data
      })
    case actions.CANCEL_CURRENT_ITEM:
      return state.map(task => {
        let data = task

        if (task.id === currentRunningItemID && task.status === taskStatuses.RUNNING) {
          data = { ...data, startedAt: null, status: taskStatuses.WAITING }
        }

        return data
      })
    case actions.LOADED_TASKS:
      return action.tasks
    case actions.UPDATE_WAITING_TASKS_ORDER:
      let notWaitingTasks =
        state.filter(task => task.status !== taskStatuses.WAITING)

      let orderedWaitingTasks =
        action.intendedWaitingOrder.map(taskID =>
          state.find(task => task.id === taskID)
        )

      return notWaitingTasks.concat(orderedWaitingTasks)
    default:
      return state
  }
}
