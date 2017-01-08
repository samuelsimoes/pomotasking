import * as runtimeEventsTypes from '../constants/runtimeEventsTypes.js'

export function stopBadgeCounter () {
  window.chrome.runtime.sendMessage({ type: runtimeEventsTypes.STOP_COUNTER })
}

export function startBadgeCounter () {
  window.chrome.runtime.sendMessage({ type: runtimeEventsTypes.START_COUNTER })
}
