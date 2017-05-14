import React, { Component } from 'react'
import Counter from './Counter'
import Tasks from './Tasks'
import TodaysPomodoros from './TodaysPomodoros'
import { TODAYS_POMODORO_LIST } from '../../constants/misc'
import * as taskStatuses from '../../constants/taskStatuses'

export default class Content extends Component {
  render () {
    if (this.props.data.currentListID === TODAYS_POMODORO_LIST) {
      return <TodaysPomodoros />
    } else {
      return (
        <div>
          <Counter
            runningItem={this.props.data.runningItem}
            actions={this.props.actions.counter} />

          <Tasks
            currentListID={this.props.data.currentListID}
            notFinishedTasks={this.props.data.tasks.filter(task => task.status !== taskStatuses.FINISHED)}
            tasks={this.props.data.tasks}
            finishedTasks={this.props.data.tasks.filter(task => task.status === taskStatuses.FINISHED).reverse()}
            actions={this.props.actions.task} />
        </div>
      )
    }
  }
}
