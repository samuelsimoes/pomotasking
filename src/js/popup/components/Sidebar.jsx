import React, { Component } from 'react'
import PomodoroListLink from './PomodoroListLink'

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
            <i className='fa fa-plus' />&nbsp;New List
          </button>
        </div>
      </div>
    )
  }

  renderBody () {
    if (this.props.lists.length) {
      return this.renderLists()
    } else {
      return <p className='list-blank-slate'>You need create a list.</p>
    }
  }

  renderLists () {
    return this.props.lists.map((list) => {
      return (
        <PomodoroListLink
          data={list}
          actions={this.props.actions}
          key={`pomodoro-list-${list.id}`} />
      )
    })
  }
}
