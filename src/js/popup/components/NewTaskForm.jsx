import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'

let ENTER_KEY_CODE = 13

export default class NewTaskForm extends Component {
  constructor () {
    super(...arguments)

    this.state = { description: '' }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onChange (evt) {
    this.setState({ description: evt.target.value })
  }

  onSubmit (evt) {
    evt.preventDefault()
    this.submit()
  }

  submit () {
    let description = this.state.description.trim()

    if (!description.length) return

    this.setState({ description: '' })

    this.props.onSubmit(this.state.description)
  }

  onKeyDown (evt) {
    if (evt.keyCode === ENTER_KEY_CODE && !evt.shiftKey) {
      evt.preventDefault()
      this.submit()
    }
  }

  render () {
    return (
      <form
        onSubmit={this.onSubmit}
        className='new-task-form'>
        <Textarea
          required
          autoFocus
          type='text'
          onKeyDown={this.onKeyDown}
          value={this.state.description}
          onChange={this.onChange}
          placeholder='New task description' />
      </form>
    )
  }
}
