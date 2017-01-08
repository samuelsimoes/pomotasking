import React, { Component } from 'react'
import Sidebar from '../containers/Sidebar'
import Counter from '../containers/Counter'
import Pomodoros from '../containers/Pomodoros'
import appReducer from '../reducers/app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

export default class App extends Component {
  constructor () {
    super(...arguments)

    this.store =
      createStore(
        appReducer,
        applyMiddleware(ReduxThunk)
      )
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <Sidebar />

          <div className='content-container'>
            <Counter />
            <Pomodoros />
          </div>
        </div>
      </Provider>
    )
  }
}
