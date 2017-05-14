import { getLists } from './lists'
import tasksSchema from '../schemas/tasks'

function areSameDate (date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

export function getDayPomodoros (date = new Date()) {
  let lists = getLists()
  let listsTasks = lists.reduce((previous, list) => {
    previous[list.name] = tasksSchema(getTasks(list.id))
    return previous
  }, {})

  let pomodoros =
    Object
      .entries(listsTasks)
      .reduce((previous, [listName, list]) => {
        list.forEach(task =>
          task.pomodoros.forEach(pomodoro => {
            if (pomodoro.running || !areSameDate(pomodoro.finishedAt, date)) { return }
            previous.push({
              taskDescription: task.description,
              taskID: task.id,
              listName: listName,
              ...pomodoro
            })
          })
        )

        return previous
      }, [])

  pomodoros.sort((a, b) => a.finishedAt - b.finishedAt)

  return pomodoros
}

export function getTasks (listID) {
  return JSON.parse(window.localStorage.getItem(`task-list-${listID}`)) || []
}

export function persistTasks (listID, tasks) {
  window.localStorage.setItem(
    `task-list-${listID}`,
    JSON.stringify(tasks)
  )
}

export function deleteTask (listID, taskID) {
  let currentList = getTasks(listID)

  let newList = currentList.filter(task => {
    return taskID !== task.id
  })

  window.localStorage.setItem(
    `task-list-${listID}`,
    JSON.stringify(newList)
  )
}
