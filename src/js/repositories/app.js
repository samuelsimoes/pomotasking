import * as listsRepository from './lists'
import * as tasksRepository from './tasks'
import * as runningItemTask from './runningItem'

export function getState () {
  let lists = listsRepository.getLists()
  let activeList = lists.find(list => list.active) || {}

  return {
    currentListID: activeList.id,
    lists: lists,
    runningItem: runningItemTask.get(),
    tasks: tasksRepository.getTasks(activeList.id)
  }
}
