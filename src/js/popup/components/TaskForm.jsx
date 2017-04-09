import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'

let ENTER_KEY_CODE = 13

export default class TaskForm extends Component {
  constructor () {
    super(...arguments)

    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.update = this.props.actions.update.bind(null, this.props.task.id)
    this.onKeyDown = this.onKeyDown.bind(this)

    this.state = {
      description: this.props.task.description
    }
  }

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
          onChange={(evt) => this.setState({ description: evt.target.value })}
          value={this.state.description} />
      </form>
    )
  }

  onKeyDown (evt) {
    if (evt.keyCode === ENTER_KEY_CODE && !evt.shiftKey) {
      evt.preventDefault()
      this.submit()
    }
  }

  submit () {
    let description = this.state.description.trim()

    if (!description.length) return

    this.update({ description: description })

    this.props.finishEdit()
  }

  onSubmit (evt) {
    evt.preventDefault()
  }

  onBlur () {
    this.props.finishEdit()
  }
}
