import * as listsRepository from './lists'
import * as tasksRepository from './tasks'
import * as runningItemTask from './runningItem'

export function getState () {
  let lists = listsRepository.getLists()
  let currentListID = listsRepository.getCurrentListID()

  return {
    currentListID,
    lists: lists,
    runningItem: runningItemTask.get(),
    tasks: tasksRepository.getTasks(currentListID)
  }
}
