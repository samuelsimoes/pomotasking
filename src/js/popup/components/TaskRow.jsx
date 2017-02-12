import React, { Component } from 'react'
import TaskPomodoros from './TaskPomodoros'
import { OPEN, FINISHED } from '../../constants/taskStatuses'

export default class TaskRow extends Component {
  constructor () {
    super(...arguments)

    this.startEdit = this.startEdit.bind(this)
    this.toggleFinish = this.props.actions.toggleFinish.bind(null, this.props.task.id)
    this.start = this.props.actions.start.bind(null, this.props.task.id)
    this.destroy = this.props.actions.destroy.bind(null, this.props.task.id)
    this.update = this.props.actions.update.bind(null, this.props.task.id)
  }

  renderFinisheButton () {
    let className = this.props.task.status === FINISHED ? 'unfinish' : 'finish'

    return (
      <button
        className={`task-control-button finish-toggle ${className}`}
        onClick={this.toggleFinish}
        type='button'>
        Toggle Finish
      </button>
    )
  }

  render () {
    return (
      <div>
        {this.renderFinisheButton()}

        <p
          className='task-name'>
          {this.props.task.description}
        </p>

        <TaskPomodoros
          taskID={this.props.task.id}
          pomodoros={this.props.task.pomodoros} />

        {this.renderControlButtons()}
      </div>
    )
  }

  startEdit () {
    this.props.startEdit()
  }

  renderControlButtons () {
    if (this.props.task.status !== OPEN) { return }

    return (
      <div className='task-controls'>
        <button
          className='task-control-button start'
          onClick={this.start}
          type='button'>
          Start
        </button>

        <button
          className='task-control-button edit'
          onClick={this.startEdit}
          type='button'>
          Edit
        </button>

        <button
          className='task-control-button destroy'
          onClick={this.destroy}
          type='button'>
          Destroy
        </button>
      </div>
    )
  }
}
