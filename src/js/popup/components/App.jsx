import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import rootSchema from '../../schemas/root'
import { sendMessage, listenMessage } from '../../utils/radio'
import { MAIN_EXECUTE_ACTION, MAIN_CHANGED_STATE } from '../../constants/messages'

function actionsMessageToMain (actionsNamespace) {
  return new Proxy({}, {
    get: function (target, property, receiver) {
      return function () {
        sendMessage(
          MAIN_EXECUTE_ACTION,
          actionsNamespace,
          property,
          Array.prototype.slice.call(arguments)
        )
      }
    }
  })
}

export default class App extends Component {
  constructor () {
    super(...arguments)

    this.state = rootSchema(this.props.initialState)

    this.actions = {
      counter: actionsMessageToMain('counter'),
      list: actionsMessageToMain('list'),
      task: actionsMessageToMain('task')
    }
  }

  componentDidMount () {
    listenMessage(MAIN_CHANGED_STATE, (state) =>
      this.setState(rootSchema(state))
    )
  }

  render () {
    return (
      <div>
        <Sidebar
          data={this.state}
          actions={this.actions} />

        <div className='content-container'>
          <Content
            data={this.state}
            actions={this.actions} />
        </div>
      </div>
    )
  }
}
