import '../sounds/ring.ogg'
import '../img/pomotodo-128.png'
import '../img/browser-action-icon.png'
import '../img/pomotodo-notification.png'
import * as runtimeEventsTypes from './constants/runtimeEventsTypes'
import * as runnableTypes from './constants/runnableTypes'
import * as runningItemRepository from './repositories/runningItem'
import runningItemInfos from './utils/runningItemInfos'
import { presentMinutesDuration } from './utils/presentDuration'
import migrator from './utils/migrator'
import taskTile from './utils/taskTitle'

migrator()

function renderMinutesBadge (leftTimeInSeconds, late) {
  let color = late ? '#ED3E3E' : '#0044A9'

  window.chrome.browserAction.setBadgeBackgroundColor({
    color: color
  })

  window.chrome.browserAction.setBadgeText({
    text: presentMinutesDuration(leftTimeInSeconds)
  })
}

function notifyFinish (item) {
  let isPomodoro = (item.type === runnableTypes.POMODORO)

  window.chrome.notifications.create(null, {
    type: 'basic',
    title: `Pomotasking - Finished ${isPomodoro ? 'Pomodoro' : 'Pause'}`,
    message: `"${taskTile(item.description)}" finished.`,
    iconUrl: 'pomotodo-notification.png'
  })

  let audio = new window.Audio('ring.ogg')

  audio.play()
}

let checkTick
let lastNotifiedItem

function clearBadge () {
  window.chrome.browserAction.setBadgeText({ text: '' })
}

function checkRunningItem (notify) {
  let item = runningItemRepository.get()
  let infos = runningItemInfos(item.startedAt, item.type)

  if (infos.late && lastNotifiedItem !== item.id) {
    notifyFinish(item)
    lastNotifiedItem = item.id
  }

  renderMinutesBadge(infos.leftTimeInSeconds, infos.late)
}

function stopCheckRunningItem () {
  clearBadge()
  clearInterval(checkTick)
}

function startCheckRunningItem () {
  stopCheckRunningItem()

  let item = runningItemRepository.get()

  if (item.late) {
    lastNotifiedItem = item.id
  }

  checkRunningItem()

  checkTick = setInterval(checkRunningItem, 500)
}

if (runningItemRepository.get()) {
  startCheckRunningItem()
}

window.chrome.runtime.onMessage.addListener(request => {
  if (request.type === runtimeEventsTypes.STOP_COUNTER) {
    stopCheckRunningItem()
  }

  if (request.type === runtimeEventsTypes.START_COUNTER) {
    startCheckRunningItem()
  }
})
