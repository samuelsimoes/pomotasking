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
import runningItemSchema from './schemas/runningItem'
import { listenMessage, sendMessage } from './utils/radio'
import { MAIN_EXECUTE_ACTION } from './constants/messages'
import './main'

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

let notificationID = 1

let notifications = {}

const SHORT_PAUSE_BUTTON_LABEL = 'Start a Short Pause'
const LONG_PAUSE_BUTTON_LABEL = 'Start a Long Pause'
const FINISH_PAUSE_BUTTON_LABEL = 'Finish the Pause'

let pauseButtons = [
  { title: FINISH_PAUSE_BUTTON_LABEL }
]

let buttons = {
  [runnableTypes.POMODORO]: [
    { title: SHORT_PAUSE_BUTTON_LABEL },
    { title: LONG_PAUSE_BUTTON_LABEL }
  ],
  [runnableTypes.SHORT_PAUSE]: pauseButtons,
  [runnableTypes.LONG_PAUSE]: pauseButtons
}

window.chrome.notifications.onClosed.addListener(notificationID => {
  delete notifications[notificationID]
})

window.chrome.notifications.onButtonClicked.addListener((notificationID, buttonIndex) => {
  let title = buttons[notifications[notificationID]][buttonIndex].title

  if (title === SHORT_PAUSE_BUTTON_LABEL) {
    sendMessage(MAIN_EXECUTE_ACTION, 'counter', 'startPause', [runnableTypes.SHORT_PAUSE])
  } else if (title === LONG_PAUSE_BUTTON_LABEL) {
    sendMessage(MAIN_EXECUTE_ACTION, 'counter', 'startPause', [runnableTypes.LONG_PAUSE])
  } else if (title === FINISH_PAUSE_BUTTON_LABEL) {
    sendMessage(MAIN_EXECUTE_ACTION, 'counter', 'finishItem')
  }

  window.chrome.notifications.clear(notificationID)
})

function notifyFinish (item) {
  let isPomodoro = (item.type === runnableTypes.POMODORO)

  let currentNotificationID = (notificationID++).toString()

  notifications[currentNotificationID] = item.type

  window.chrome.notifications.create(currentNotificationID, {
    type: 'basic',
    title: `Pomotasking - Finished ${isPomodoro ? 'Pomodoro' : 'Pause'}`,
    message: `"${taskTile(item.description)}" finished.`,
    iconUrl: 'pomotodo-notification.png',
    priority: 1,
    buttons: buttons[item.type]
  })

  setTimeout(() =>
    window.chrome.notifications.clear(currentNotificationID)
  , 5000)

  let audio = new window.Audio('ring.ogg')

  audio.play()
}

let checkTick
let lastNotifiedItem

function clearBadge () {
  window.chrome.browserAction.setBadgeText({ text: '' })
}

function checkRunningItem () {
  let item = runningItemSchema(runningItemRepository.get())
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

listenMessage(runtimeEventsTypes.STOP_COUNTER, stopCheckRunningItem)
listenMessage(runtimeEventsTypes.START_COUNTER, startCheckRunningItem)
