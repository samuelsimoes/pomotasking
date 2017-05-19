import React, { Component } from 'react'
import TaskRow from './TaskRow'
import TaskForm from './TaskForm'

export default class Task extends Component {
  update = (data) => this.props.actions.update(this.props.task.id, data)

  startEdit = () => this.update({ editing: true })

  finishEdit = () => this.update({ editing: false })

  submitEdit = (description) => this.update({ editing: false, description })

  renderTaskName () {
    if (this.props.task.editing) { return }

    return (
      <TaskRow
        startEdit={this.startEdit}
        actions={this.props.actions}
        task={this.props.task} />
    )
  }

  renderForm () {
    if (!this.props.task.editing) { return }

    return (
      <TaskForm
        finishEdit={this.finishEdit}
        submit={this.submitEdit}
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
