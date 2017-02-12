import React, { Component } from 'react'
import { TASK_MAX_LENGTH } from '../../constants/misc'

export default class TaskForm extends Component {
  constructor () {
    super(...arguments)

    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.update = this.props.actions.update.bind(null, this.props.task.id)

    this.state = {
      description: this.props.task.description
    }
  }

  render () {
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

  onSubmit (evt) {
    evt.preventDefault()
    this.update({ description: this.state.description })
    this.props.finishEdit()
  }

  onBlur () {
    this.props.finishEdit()
  }
}
