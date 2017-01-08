export function get () {
  let item = JSON.parse(window.localStorage.getItem('running-item'))

  if (item) {
    item = {
      ...item,
      startedAt: new Date(item.startedAt)
    }
  }

  return item
}

export function persist (data) {
  window.localStorage.setItem('running-item', JSON.stringify(data))
}
