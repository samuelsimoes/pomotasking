export function get () {
  let infos = JSON.parse(window.localStorage.getItem('configs'))

  return {
    pomodoroLength: 20,
    shortPauseLength: 15,
    longPauseLength: 5,
    ...infos
  }
}

export function persist (configs) {
  window.localStorage.setItem('configs', JSON.stringify({
    pomodoroLength: configs.pomodoroLength,
    shortPauseLength: configs.shortPauseLength,
    longPauseLength: configs.longPauseLength
  }))
}
