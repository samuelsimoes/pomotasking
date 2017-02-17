import React, { Component } from 'react'
import TaskListLink from './TaskListLink'

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
        <TaskListLink
          data={list}
          active={this.props.currentListID === list.id}
          actions={this.props.actions}
          key={`task-list-${list.id}`} />
      )
    })
  }
}
