import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'

let ENTER_KEY_CODE = 13

export default class TaskForm extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      description: this.props.task.description
    }
  }

  onBlur = () => this.props.finishEdit()

  onSubmit = (evt) => evt.preventDefault()

  onKeyDown = (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE && !evt.shiftKey) {
      evt.preventDefault()
      this.submit()
    }
  }

  onChange = (evt) => this.setState({ description: evt.target.value })

  render () {
    return (
      <form
        onSubmit={this.onSubmit}
        className='task-form'>
        <Textarea
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          type='text'
          autoFocus
          required
          onChange={this.onChange}
          value={this.state.description} />
      </form>
    )
  }

  submit () {
    let description = this.state.description.trim()

    if (!description.length) return

    this.props.submit(description)
  }
}
