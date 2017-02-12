import React, { PureComponent } from 'react'
import TaskRow from './TaskRow'
import TaskForm from './TaskForm'

export default class Task extends PureComponent {
  constructor () {
    super(...arguments)

    this.state = { editing: false }
  }

  renderTaskName () {
    if (this.state.editing) { return }

    return (
      <TaskRow
        startEdit={() => this.setState({ editing: true })}
        actions={this.props.actions}
        task={this.props.task} />
    )
  }

  renderForm () {
    if (!this.state.editing) { return }

    return (
      <TaskForm
        finishEdit={() => this.setState({ editing: false })}
        actions={this.props.actions}
        task={this.props.task} />
    )
  }

  render () {
    return (
      <div
        className={`task editable ${this.props.task.status.toLowerCase()}`}>
        {this.renderTaskName()}
        {this.renderForm()}
      </div>
    )
  }
}
