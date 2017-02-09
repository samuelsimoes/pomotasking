import React, { Component } from 'react'
import { TASK_MAX_LENGTH } from '../../constants/misc'

export default class Task extends Component {
  constructor () {
    super(...arguments)

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
        <div className='task-controls'>
          {this.renderStartButton()}

          <button
            className='control-button edit'
            onClick={this.startEdit}
            type='button'>
            Edit
          </button>

          <button
            className='control-button destroy'
            onClick={this.destroy}
            type='button'>
            Destroy
          </button>
        </div>
      </div>
    )
  }

  renderStartButton () {
    if (!this.props.firstItem) { return }

    return (
      <button
        className='control-button start'
        onClick={this.start}
        type='button'>
        Start
      </button>
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
        className='task editable'>
        {this.state.editing ? this.renderForm() : this.renderTaskName()}
      </div>
    )
  }
}
