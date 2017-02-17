import React, { Component } from 'react'
import Counter from '../containers/Counter'
import Tasks from '../containers/Tasks'
import TodaysPomodoros from './TodaysPomodoros'
import { TODAYS_POMODORO_LIST } from '../../constants/misc'

export default class Content extends Component {
  render () {
    if (this.props.currentListID === TODAYS_POMODORO_LIST) {
      return <TodaysPomodoros />
    } else {
      return (
        <div>
          <Counter />
          <Tasks />
        </div>
      )
    }
  }
}
