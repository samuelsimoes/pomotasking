export function getTasks (listID) {
  let list = JSON.parse(window.localStorage.getItem(`task-list-${listID}`)) || []

  return list.map(task => {
    return {
      ...task,
      addedAt: task.addedAt ? (new Date(task.addedAt)) : null,
      startedAt: task.startedAt ? (new Date(task.startedAt)) : null,
      finishedAt: task.finishedAt ? (new Date(task.finishedAt)) : null
    }
  })
}

export function persistTasks (listID, tasks) {
  window.localStorage.setItem(
    `task-list-${listID}`,
    JSON.stringify(tasks)
  )
}

export function persistTask (taskData) {
  let currentList = getTasks(taskData.listID)
  let newList
  let updated

  newList = currentList.map(task => {
    if (task.id === taskData.id) {
      updated = true
      return { ...task, ...taskData }
    } else {
      return task
    }
  })

  if (!updated) {
    newList = newList.concat(taskData)
  }

  window.localStorage.setItem(
    `task-list-${taskData.listID}`,
    JSON.stringify(newList)
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
