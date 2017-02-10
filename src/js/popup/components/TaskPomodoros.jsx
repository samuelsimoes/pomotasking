import React, { Component } from 'react'

let times = function (n, iterator) {
  var accum = Array(Math.max(0, n))
  for (var i = 0; i < n; i++) accum[i] = iterator(i)
  return accum
}

export default class TaskPomodoros extends Component {
  render () {
    return (
      <div className='task-pomodoros'>
        {this.renderPomodoros()}
      </div>
    )
  }

  renderPomodoros () {
    let pomodorosCount =
      this
        .props
        .pomodoros
        .filter(pomodoro => !pomodoro.running)
        .length

    return times(pomodorosCount, (index) =>
      <div
        className='task-pomodoro-sign'
        key={`pomodoro-${this.props.taskID}-${index}`} />
    )
  }
}
