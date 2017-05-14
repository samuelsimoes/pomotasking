import listReducer from './list'
import tasksReducer from './tasks'
import runningItemReducer from './runningItem'
import currentListIDReducer from './currentListID'
import * as appRepository from '../../repositories/app'
import rootSchema from '../../schemas/root'

export default function (state = rootSchema(appRepository.getState()), action) {
  return {
    currentListID: currentListIDReducer(state.currentListID, action),
    lists: listReducer(state.lists, action),
    runningItem: runningItemReducer(
      state.runningItem,
      state.tasks,
      action
    ),
    tasks: tasksReducer(
      state.tasks,
      state.currentListID,
      state.runningItem ? state.runningItem.id : null,
      action
    )
  }
}
