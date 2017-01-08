export function getPomodoros (listID) {
  let list = JSON.parse(window.localStorage.getItem(`pomodoro-list-${listID}`)) || []

  return list.map(pomodoro => {
    return {
      ...pomodoro,
      addedAt: pomodoro.addedAt ? (new Date(pomodoro.addedAt)) : null,
      startedAt: pomodoro.startedAt ? (new Date(pomodoro.startedAt)) : null,
      finishedAt: pomodoro.finishedAt ? (new Date(pomodoro.finishedAt)) : null
    }
  })
}

export function persistPomodoros (listID, pomodoros) {
  window.localStorage.setItem(
    `pomodoro-list-${listID}`,
    JSON.stringify(pomodoros)
  )
}

export function persistPomodoro (pomodoroData) {
  let currentList = getPomodoros(pomodoroData.listID)
  let newList
  let updated

  newList = currentList.map(pomodoro => {
    if (pomodoro.id === pomodoroData.id) {
      updated = true
      return { ...pomodoro, ...pomodoroData }
    } else {
      return pomodoro
    }
  })

  if (!updated) {
    newList = newList.concat(pomodoroData)
  }

  window.localStorage.setItem(
    `pomodoro-list-${pomodoroData.listID}`,
    JSON.stringify(newList)
  )
}

export function deletePomodoro (listID, pomodoroID) {
  let currentList = getPomodoros(listID)

  let newList = currentList.filter(pomodoro => {
    return pomodoroID !== pomodoro.id
  })

  window.localStorage.setItem(
    `pomodoro-list-${listID}`,
    JSON.stringify(newList)
  )
}
