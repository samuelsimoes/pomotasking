import React, { Component } from 'react'
import NewPomodoroForm from './NewPomodoroForm'
import Pomodoro from './Pomodoro'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

let Element = SortableElement(({pomodoro, actions, firstItem}) =>
  <Pomodoro
    actions={actions}
    pomodoro={pomodoro}
    firstItem={firstItem} />
)

let List = SortableContainer(({items, actions}) =>
  <div>
    {items.map((pomodoro, index) =>
      <Element
        pomodoro={pomodoro}
        actions={actions}
        key={`pomodoro-item-${pomodoro.id}`}
        index={index}
        firstItem={items.indexOf(pomodoro) === 0} />
    )}
  </div>
)

export default class Pomodoros extends Component {
  constructor () {
    super(...arguments)

    this.state = { showingFinished: false }
  }

  render () {
    if (this.props.currentListID) {
      return this.renderBody()
    } else {
      return (
        <p className='pomodoros-blank-slate pomodoros-without-list'>
          Choose the list in the sidebar.
        </p>
      )
    }
  }

  renderBody () {
    return (
      <div>
        <NewPomodoroForm
          onSubmit={(description) => this.props.actions.newPomodoro(description)} />

        <div className='pomodoros-container'>
          {this.renderList()}
          {this.renderShowFinishedButton()}
          {this.renderFinishedList()}
        </div>
      </div>
    )
  }

  renderShowFinishedButton () {
    if (!this.props.finishedPomodoros.length) { return }

    return (
      <button
        className='pomodoros-list-finished-separator'
        type='button'
        onClick={() => this.setState({ showingFinished: !this.state.showingFinished })}>
        {this.state.showingFinished ? 'Hide' : 'Show'} Completed ({this.props.finishedPomodoros.length})
      </button>
    )
  }

  renderFinishedList () {
    if (!this.state.showingFinished) { return }

    return this.props.finishedPomodoros.map(pomodoro =>
      <div
        key={`finished-pomodoro-${pomodoro.id}`}
        className='pomodoro-task'>
        <p
          className='pomodoro-task-name'>
          {pomodoro.description}
        </p>
      </div>
    )
  }

  renderList () {
    if (this.props.pomodoros.length) {
      return (
        <List
          items={this.props.waitingPomodoros}
          onSortEnd={({oldIndex, newIndex}) => {
            let newArrange = arrayMove(this.props.waitingPomodoros, oldIndex, newIndex)

            let newOrder = newArrange.map(pomodoro => pomodoro.id)

            this.props.actions.updateWaitingPomodorosOrder(newOrder)
          }}
          shouldCancelStart={(evt) => evt.target.tagName !== 'P'}
          actions={this.props.actions} />
      )
    } else {
      return (
        <p className='pomodoros-blank-slate pomodoros-list-empty'>
          Your list is empty! Create a pomodoro task above.
        </p>
      )
    }
  }
}
