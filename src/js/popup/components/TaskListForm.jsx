import React, { Component } from 'react'

export default class TaskListForm extends Component {
  constructor () {
    super(...arguments)

    this.state = { name: this.props.data.name }
  }

  onChange = (evt) => this.setState({ name: evt.target.value })

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.onSubmit(this.state.name)
  }

  render () {
    return (
      <form
        onSubmit={this.onSubmit}
        className='list-link-form'>
        <input
          type='text'
          required
          maxLength={25}
          autoFocus
          onBlur={this.props.onCancel}
          value={this.state.name}
          onChange={this.onChange}
          placeholder="List's name" />
      </form>
    )
  }
}
