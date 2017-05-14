export function get () {
  return JSON.parse(window.localStorage.getItem('running-item'))
}

export function persist (data) {
  window.localStorage.setItem('running-item', JSON.stringify(data))
}
