import React, { Component } from 'react'
import { POMODORO_MAX_LENGTH } from '../../constants/misc'

export default class NewPomodoroForm extends Component {
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
        className='new-pomodoro-form'>
        <input
          required
          autoFocus
          maxLength={POMODORO_MAX_LENGTH}
          type='text'
          value={this.state.description}
          onChange={this.onChange}
          placeholder='New pomodoro task' />
      </form>
    )
  }
}
