import React, { PureComponent } from 'react'
import TaskListForm from './TaskListForm'

export default class TaskListLink extends PureComponent {
  choose = () => this.props.actions.choose(this.props.data.id)

  edit = () => this.props.actions.update(this.props.data.id, { editing: true })

  destroy = () => this.props.actions.destroy(this.props.data.id)

  onSubmit = (name) => this.props.actions.update(
    this.props.data.id,
    { editing: false, name }
  )

  onBlur = () => {
    if (this.props.data.name) {
      this.props.actions.update(this.props.data.id, { editing: false })
    } else {
      this.destroy()
    }
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

  className () {
    let className = 'list-link'

    if (this.props.active) {
      className += ' active'
    }

    return className
  }

  renderForm () {
    if (!this.props.data.editing) { return }

    return (
      <TaskListForm
        data={this.props.data}
        onSubmit={this.onSubmit}
        onCancel={this.onBlur} />
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
            className='edit'
            type='button'
            onClick={this.edit}>
            Edit
          </button>
          &nbsp;
          <button
            type='button'
            className='destroy'
            onClick={this.destroy}>
            Remove
          </button>
        </div>
      </div>
    )
  }
}
