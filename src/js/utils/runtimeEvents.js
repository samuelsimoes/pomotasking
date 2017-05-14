import * as runtimeEventsTypes from '../constants/runtimeEventsTypes.js'
import { sendMessage } from '../utils/radio'

export function stopBadgeCounter (callback) {
  sendMessage(runtimeEventsTypes.STOP_COUNTER)
}

export function startBadgeCounter () {
  sendMessage(runtimeEventsTypes.START_COUNTER)
}
