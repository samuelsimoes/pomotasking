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
        </div>
      </div>
    )
  }

  renderList () {
    if (this.props.waitingPomodoros.length) {
      return (
        <List
          items={this.props.waitingPomodoros}
          onSortEnd={({oldIndex, newIndex}) => {
            let newArrange = arrayMove(this.props.waitingPomodoros, oldIndex, newIndex)

            let newOrder = newArrange.map(pomodoro => pomodoro.id)

            this.props.actions.updateWaitingPomodorosOrder(newOrder)
          }}
          shouldCancelStart={(evt) => evt.target.tagName === 'BUTTON'}
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
