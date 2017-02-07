import React, { Component } from 'react'
import { POMODORO_MAX_LENGTH } from '../../constants/misc'

export default class Pomodoro extends Component {
  constructor () {
    super(...arguments)

    this.start = this.props.actions.start.bind(null, this.props.pomodoro.id)
    this.destroy = this.props.actions.destroy.bind(null, this.props.pomodoro.id)
    this.update = this.props.actions.update.bind(null, this.props.pomodoro.id)
    this.startEdit = this.startEdit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onBlur = this.onBlur.bind(this)

    this.state = {
      editing: false,
      description: this.props.pomodoro.description
    }
  }

  startEdit () {
    this.setState({
      editing: true,
      description: this.props.pomodoro.description
    })
  }

  onBlur () {
    this.setState({ editing: false })
  }

  renderTaskName () {
    return (
      <div>
        <p
          className='pomodoro-task-name'>
          {this.props.pomodoro.description}
        </p>
        <div className='pomodoro-task-controls'>
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
        className='pomodoro-task-form'>
        <input
          onBlur={this.onBlur}
          maxLength={POMODORO_MAX_LENGTH}
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
        className='pomodoro-task editable'>
        {this.state.editing ? this.renderForm() : this.renderTaskName()}
      </div>
    )
  }
}
