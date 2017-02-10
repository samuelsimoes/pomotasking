import React, { PureComponent } from 'react'
import { RUNNING } from '../../constants/taskStatuses'
import { TASK_MAX_LENGTH } from '../../constants/misc'
import TaskPomodoros from './TaskPomodoros'

export default class Task extends PureComponent {
  constructor () {
    super(...arguments)

    this.finish = this.props.actions.finish.bind(null, this.props.task.id)
    this.start = this.props.actions.start.bind(null, this.props.task.id)
    this.destroy = this.props.actions.destroy.bind(null, this.props.task.id)
    this.update = this.props.actions.update.bind(null, this.props.task.id)
    this.startEdit = this.startEdit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onBlur = this.onBlur.bind(this)

    this.state = {
      editing: false,
      description: this.props.task.description
    }
  }

  startEdit () {
    this.setState({
      editing: true,
      description: this.props.task.description
    })
  }

  onBlur () {
    this.setState({ editing: false })
  }

  renderTaskName () {
    return (
      <div>
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

  renderControlButtons () {
    if (this.props.task.status === RUNNING) { return }

    return (
      <div className='task-controls'>
        <button
          className='task-control-button finish'
          onClick={this.finish}
          type='button'>
          Finish
        </button>

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

  onSubmit (evt) {
    evt.preventDefault()
    this.update({ description: this.state.description })
    this.setState({ editing: false })
  }

  renderForm () {
    return (
      <form
        onSubmit={this.onSubmit}
        className='task-form'>
        <input
          onBlur={this.onBlur}
          maxLength={TASK_MAX_LENGTH}
          type='text'
          autoFocus
          required
          onChange={(evt) => this.setState({ description: evt.target.value })}
          value={this.state.description} />
      </form>
    )
  }

  render () {
    return (
      <div
        className={`task editable ${this.props.task.status.toLowerCase()}`}>
        {this.state.editing ? this.renderForm() : this.renderTaskName()}
      </div>
    )
  }
}
