let callbackIds = 1

let events = {}

window.chrome.runtime.onMessage.addListener((request) => {
  if (!request.messageName) return

  for (let messageName in events) {
    if (messageName === request.messageName) {
      for (let subscriptionID in events[messageName]) {
        events[messageName][subscriptionID].apply(null, request.args)
      }
    }
  }
})

export function sendMessage (messageName) {
  let callbacks = events[messageName] || {}

  let args = Array.prototype.slice.call(arguments, 1)

  window.chrome.runtime.sendMessage({ messageName: messageName, args: args })

  for (let subscriptionID in callbacks) {
    callbacks[subscriptionID].apply(null, args)
  }
}

export function removeListening (messageName, subscriptionID) {
  events[messageName] = events[messageName] || {}
  delete events[messageName][subscriptionID]
}

export function listenMessage (messageName, callback) {
  let subscriptionID = callbackIds++

  events[messageName] = events[messageName] || {}
  events[messageName][subscriptionID] = callback

  return removeListening.bind(null, messageName, subscriptionID)
}
