import { getLists } from './lists'

function areSameDate (date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

export function getDayPomodoros (date = new Date()) {
  let lists = getLists()
  let listsTasks = lists.reduce((previous, list) => {
    previous[list.name] = getTasks(list.id)
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
  let list = JSON.parse(window.localStorage.getItem(`task-list-${listID}`)) || []

  return list.map(task => {
    return {
      ...task,
      addedAt: task.addedAt ? (new Date(task.addedAt)) : null,
      startedAt: task.startedAt ? (new Date(task.startedAt)) : null,
      finishedAt: task.finishedAt ? (new Date(task.finishedAt)) : null,
      pomodoros: task.pomodoros.map(pomodoro => {
        return {
          ...pomodoro,
          startedAt: pomodoro.startedAt ? (new Date(pomodoro.startedAt)) : null,
          finishedAt: pomodoro.finishedAt ? (new Date(pomodoro.finishedAt)) : null
        }
      })
    }
  })
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
