import React, { Component } from 'react'
import { getDayPomodoros } from '../../repositories/tasks'

function presentHour (date) {
  let hour = date.getHours()
  let minutes = date.getMinutes()
  return `${hour}:${minutes.toString().length === 1 ? '0' : ''}${minutes}`
}

function orderedGroupArray (array, key) {
  let groupedArray = []

  array.forEach(item => {
    let lastGroup = groupedArray[groupedArray.length - 1]

    if (!lastGroup || lastGroup[0] !== item[key]) {
      groupedArray.push([item[key], [item]])
    } else {
      lastGroup[1].push(item)
    }
  })

  return groupedArray
}

export default class TodaysPomodoros extends Component {
  constructor () {
    super(...arguments)
    this.pomodoros = orderedGroupArray(getDayPomodoros(), 'taskID')
  }

  render () {
    return (
      <div className='pomodoro-history'>
        {this.renderBlankSlate()}
        {this.renderPomodoros()}
      </div>
    )
  }

  renderBlankSlate () {
    if (this.pomodoros.length) { return }
    return <p className='pomodoro-history-blank-slate'>No finished pomodoros today!</p>
  }

  renderPomodoros () {
    return this.pomodoros.map(pomodorosGroup => {
      let key = `task-${this.pomodoros.indexOf(pomodorosGroup)}`
      let firstPomodoro = pomodorosGroup[1][0]

      return (
        <div key={key}>
          <p className='pomodoro-history-task'>
            {firstPomodoro.taskDescription}

            <span className='list-name'>
              at {firstPomodoro.listName}
            </span>
          </p>

          {pomodorosGroup[1].map(pomodoro => {
            let pomodoroKey = `${key}-${pomodorosGroup[1].indexOf(pomodoro)}`

            return (
              <p
                className='pomodoro-history-pomodoro'
                key={pomodoroKey}>
                {presentHour(pomodoro.startedAt)} » {presentHour(pomodoro.finishedAt)}
              </p>
            )
          })}
        </div>
      )
    })
  }
}
