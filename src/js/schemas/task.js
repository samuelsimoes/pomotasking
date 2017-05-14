export default function (data) {
  return {
    ...data,
    addedAt: data.addedAt ? (new Date(data.addedAt)) : null,
    startedAt: data.startedAt ? (new Date(data.startedAt)) : null,
    finishedAt: data.finishedAt ? (new Date(data.finishedAt)) : null,
    pomodoros: data.pomodoros.map(pomodoro => {
      return {
        ...pomodoro,
        startedAt: pomodoro.startedAt ? (new Date(pomodoro.startedAt)) : null,
        finishedAt: pomodoro.finishedAt ? (new Date(pomodoro.finishedAt)) : null
      }
    })
  }
}
