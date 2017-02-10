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
