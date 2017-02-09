import React, { Component } from 'react'
import { TASK_MAX_LENGTH } from '../../constants/misc'

export default class NewTaskForm extends Component {
  constructor () {
    super(...arguments)

    this.state = { description: '' }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (evt) {
    this.setState({ description: evt.target.value })
  }

  onSubmit (evt) {
    evt.preventDefault()
    this.setState({ description: '' })
    this.props.onSubmit(this.state.description)
  }

  render () {
    return (
      <form
        onSubmit={this.onSubmit}
        className='new-task-form'>
        <input
          required
          autoFocus
          maxLength={TASK_MAX_LENGTH}
          type='text'
          value={this.state.description}
          onChange={this.onChange}
          placeholder='New task description' />
      </form>
    )
  }
}
