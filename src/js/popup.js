import '../fonts/BaseIcons.font'
import '../css/popup.css'
import App from './popup/components/App'
import React from 'react'
import { render } from 'react-dom'
import { sendMessage, listenMessage } from './utils/radio'
import { REQUEST_ACTUAL_STATE, ACTUAL_STATE } from './constants/messages'

sendMessage(REQUEST_ACTUAL_STATE)

listenMessage(ACTUAL_STATE, state => {
  render(
    <App initialState={state} />,
    window.document.getElementById('app-container')
  )
})
