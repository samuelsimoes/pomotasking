import * as actions from '../constants/actionTypes'
import * as taskStatuses from '../../constants/taskStatuses'

function cancelPomodoro (task) {
  let pomodoros = task.pomodoros.filter(pomodoro => !pomodoro.running)

  return {
    ...task,
    pomodoros: pomodoros,
    status: taskStatuses.OPEN
  }
}

function startPomodoro (task, now) {
  let pomodoros = task.pomodoros.concat({
    running: true,
    startedAt: now
  })

  return {
    ...task,
    pomodoros: pomodoros,
    status: taskStatuses.RUNNING
  }
}

function finishPomodoro (task, now) {
  let pomodoros = task.pomodoros.map(pomodoro => {
    if (pomodoro.running) {
      return {
        ...pomodoro,
        running: false,
        finishedAt: now
      }
    } else {
      return pomodoro
    }
  })

  return {
    ...task,
    pomodoros: pomodoros,
    status: taskStatuses.OPEN
  }
}

function listWithNewTask (state, currentListID, data) {
  return (
    state
      .concat([{
        id: data.id,
        description: data.description,
        addedAt: data.now,
        status: taskStatuses.OPEN,
        listID: currentListID,
        pomodoros: []
      }])
  )
}

function toggleFinishTask (task, now) {
  return {
    ...task,
    status: (task.status === taskStatuses.FINISHED ? taskStatuses.OPEN : taskStatuses.FINISHED),
    finishedAt: (task.status === taskStatuses.FINISHED ? null : now)
  }
}

function listWithToggleTask (tasks, now, toggleTaskID) {
  let task = tasks.find(task => task.id === toggleTaskID)

  let otherTasks =
    tasks.filter(task => task.id !== toggleTaskID)

  return (
    otherTasks.concat([toggleFinishTask(task, now)])
  )
}

export default function (state, currentListID, currentRunningItemID, action) {
  switch (action.type) {
    case actions.TOGGLE_FINISH_TASK:
      return listWithToggleTask(state, action.now, action.id)
    case actions.UPDATE_TASK:
      return state.map(task =>
        (task.id === action.id) ? { ...task, ...action.data } : task
      )
    case actions.NEW_TASK:
      return listWithNewTask(state, currentListID, action)
    case actions.DESTROY_TASK:
      return state.filter(task => task.id !== action.id)
    case actions.FINISH_CURRENT_ITEM:
      return state.map(task =>
        (task.id === currentRunningItemID) ? finishPomodoro(task, action.now) : task
      )
    case actions.START_POMODORO:
      return state.map(task => {
        let data = task

        if (task.status === taskStatuses.RUNNING) {
          data = finishPomodoro(data, action.now)
        }

        if (task.id === action.id) {
          data = startPomodoro(data, action.now)
        }

        return data
      })
    case actions.CANCEL_CURRENT_ITEM:
      return state.map(task =>
        (task.id === currentRunningItemID) ? cancelPomodoro(task) : task
      )
    case actions.LOADED_TASKS:
      return action.tasks
    case actions.UPDATE_OPEN_TASKS_ORDER:
      let finishedTasks =
        state.filter(task => task.status === taskStatuses.FINISHED)

      let orderedNotFinishedTasks =
        action.intendedOpenedOrder.map(taskID =>
          state.find(task => task.id === taskID)
        )

      return finishedTasks.concat(orderedNotFinishedTasks)
    default:
      return state
  }
}
