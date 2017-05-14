import appReducer from './reducers/app'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as counterActions from './actions/counter'
import * as listActions from './actions/list'
import * as taskActions from './actions/task'
import { sendMessage, listenMessage } from '../utils/radio'
import {
  MAIN_CHANGED_STATE,
  ACTUAL_STATE,
  REQUEST_ACTUAL_STATE,
  MAIN_EXECUTE_ACTION
} from '../constants/messages'

let actions = {
  counter: counterActions,
  list: listActions,
  task: taskActions
}

let store = createStore(
  appReducer,
  applyMiddleware(ReduxThunk)
)

store.subscribe(newState =>
  sendMessage(MAIN_CHANGED_STATE, JSON.parse(JSON.stringify(store.getState())))
)

listenMessage(REQUEST_ACTUAL_STATE, () =>
  sendMessage(ACTUAL_STATE, JSON.parse(JSON.stringify(store.getState())))
)

listenMessage(MAIN_EXECUTE_ACTION, (actionsNamespace, actionName, args) =>
  store.dispatch(actions[actionsNamespace][actionName].apply(null, args))
)
