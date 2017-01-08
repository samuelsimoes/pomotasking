import React, { PureComponent } from 'react'

export default class PomodoroListLink extends PureComponent {
  constructor () {
    super(...arguments)

    this.onSubmit = this.onSubmit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.choose = this.props.actions.choose.bind(null, this.props.data.id)
    this.startEdit = this.props.actions.startEdit.bind(null, this.props.data.id)
    this.destroy = this.destroy.bind(this)
  }

  onBlur (evt) {
    if (this.props.data.name) {
      this.props.actions.cancelEdit(this.props.data.id)
    } else {
      this.props.actions.destroy(this.props.data.id)
    }
  }

  onSubmit (evt) {
    evt.preventDefault()
    this.props.actions.submitEdit(this.props.data.id)
  }

  render () {
    return (
      <div
        className={this.className()}>
        {this.renderLink()}
        {this.renderForm()}
      </div>
    )
  }

  destroy () {
    this.props.actions.destroy(this.props.data.id)
  }

  className () {
    let className = 'list-link'

    if (this.props.data.active) {
      className += ' active'
    }

    return className
  }

  renderForm () {
    if (!this.props.data.editing) { return }

    return (
      <form
        onSubmit={this.onSubmit}
        className='list-link-form'>
        <input
          type='text'
          required
          maxLength={25}
          autoFocus
          onBlur={this.onBlur}
          value={this.props.data.intended_name || ''}
          onChange={(evt) => this.props.actions.update(
            this.props.data.id,
            { intended_name: evt.target.value }
          )}
          placeholder="List's name" />
      </form>
    )
  }

  renderLink () {
    if (this.props.data.editing) { return }

    return (
      <div>
        <a onClick={this.choose}>
          {this.props.data.name}
        </a>

        <div className='list-link-controls'>
          <button
            type='button'
            onClick={this.startEdit}>
            <i className='fa fa-pencil' />
            <span>Edit</span>
          </button>
          &nbsp;
          <button
            type='button'
            onClick={this.destroy}>
            <i className='fa fa-times' />
            <span>Remove</span>
          </button>
        </div>
      </div>
    )
  }
}
