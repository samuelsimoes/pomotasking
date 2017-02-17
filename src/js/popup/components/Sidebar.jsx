import React, { Component } from 'react'
import TaskListLink from './TaskListLink'
import { TODAYS_POMODORO_LIST } from '../../constants/misc'

export default class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar'>
        <div className='main-call'>
          Pomotasking
        </div>

        <div className='lists'>
          {this.renderBody()}

          <button
            onClick={this.props.actions.buildList}
            className='new-list-btn'>
            New List
          </button>
        </div>
      </div>
    )
  }

  renderTodaysPomodoroLink () {
    let className = 'list-link'

    if (this.props.currentListID === TODAYS_POMODORO_LIST) {
      className += ' active'
    }

    return (
      <div className={className}>
        <a onClick={() => this.props.actions.choose(TODAYS_POMODORO_LIST)}>
          Today's Pomodoros
        </a>
      </div>
    )
  }

  renderBody () {
    if (this.props.lists.length) {
      return (
        <div>
          {this.renderTodaysPomodoroLink()}
          {this.renderLists()}
        </div>
      )
    } else {
      return <p className='list-blank-slate'>You need create a list.</p>
    }
  }

  renderLists () {
    return this.props.lists.map((list) => {
      return (
        <TaskListLink
          data={list}
          active={this.props.currentListID === list.id}
          actions={this.props.actions}
          key={`task-list-${list.id}`} />
      )
    })
  }
}
