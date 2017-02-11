import React, { Component } from 'react'
import NewTaskForm from './NewTaskForm'
import Task from './Task'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import TaskPomodoros from './TaskPomodoros'

let Element = SortableElement(({task, actions}) =>
  <Task
    actions={actions}
    task={task} />
)

let List = SortableContainer(({items, actions, children}) =>
  <div className='tasks-container'>
    {items.map((task, index) =>
      <Element
        task={task}
        actions={actions}
        key={`task-item-${task.id}`}
        index={index} />
    )}
    {children}
  </div>
)

export default class Tasks extends Component {
  constructor () {
    super(...arguments)

    this.state = { showingFinished: false }
  }

  render () {
    if (this.props.currentListID) {
      return this.renderBody()
    } else {
      return (
        <p className='tasks-blank-slate tasks-without-list'>
          Choose the list in the sidebar.
        </p>
      )
    }
  }

  renderBody () {
    return (
      <div>
        <NewTaskForm
          onSubmit={(description) => this.props.actions.newTask(description)} />

        {this.renderList()}
      </div>
    )
  }

  renderShowFinishedButton () {
    if (!this.props.finishedTasks.length) { return }

    return (
      <button
        className='tasks-list-finished-separator'
        key='show-finished-task-button'
        type='button'
        onClick={() => this.setState({ showingFinished: !this.state.showingFinished })}>
        {this.state.showingFinished ? 'Hide' : 'Show'} Completed ({this.props.finishedTasks.length})
      </button>
    )
  }

  renderFinishedList () {
    if (!this.state.showingFinished) { return }

    return this.props.finishedTasks.map(task =>
      <div
        key={`finished-task-${task.id}`}
        className='task finished'>
        <p
          className='task-name'>
          {task.description}
        </p>

        <TaskPomodoros
          taskID={task.id}
          pomodoros={task.pomodoros} />
      </div>
    )
  }

  renderList () {
    if (this.props.tasks.length) {
      return (
        <List
          items={this.props.notFinishedTasks}
          onSortEnd={({oldIndex, newIndex}) => {
            let newArrange = arrayMove(this.props.notFinishedTasks, oldIndex, newIndex)

            let newOrder = newArrange.map(task => task.id)

            this.props.actions.updateOpenedTasksOrder(newOrder)
          }}
          shouldCancelStart={(evt) => evt.target.tagName !== 'P'}
          children={[
            this.renderShowFinishedButton(),
            this.renderFinishedList()
          ]}
          actions={this.props.actions} />
      )
    } else {
      return (
        <p className='tasks-blank-slate tasks-list-empty'>
          Your list is empty! Create a task task above.
        </p>
      )
    }
  }
}
