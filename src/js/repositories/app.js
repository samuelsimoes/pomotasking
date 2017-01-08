import * as listsRepository from './lists'
import * as pomodorosRepository from './pomodoros'
import * as runningItemPomodoro from './runningItem'

export function getState () {
  let lists = listsRepository.getLists()
  let activeList = lists.find(list => list.active) || {}

  return {
    currentListID: activeList.id,
    lists: lists,
    runningItem: runningItemPomodoro.get(),
    pomodoros: pomodorosRepository.getPomodoros(activeList.id)
  }
}
