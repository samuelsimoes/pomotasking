import React, { Component } from 'react'
import * as runnableTypes from '../../constants/runnableTypes'
import runningItemInfos from '../../utils/runningItemInfos'
import { presentFullDuration } from '../../utils/presentDuration'

export default class Counter extends Component {
  constructor () {
    super(...arguments)

    this.startShortPause = this.props.actions.startPause.bind(null, runnableTypes.SHORT_PAUSE)
    this.startLongPause = this.props.actions.startPause.bind(null, runnableTypes.LONG_PAUSE)
  }

  componentDidMount () {
    if (this.props.runningItem) {
      this.tick = setInterval(this.forceUpdate.bind(this), 500)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.runningItem) {
      this.tick = setInterval(this.forceUpdate.bind(this), 500)
    }
  }

  componentWillUnmount () {
    clearInterval(this.tick)
  }

  render () {
    let infos
    let className = 'counter'

    if (this.props.runningItem) {
      infos = runningItemInfos(
        this.props.runningItem.startedAt,
        this.props.runningItem.type
      )
    }

    if (infos && infos.late) {
      className += ' counter-timeout'
    }

    return (
      <div className='main-counter'>
        <div className='counter-current-running-item'>
          {this.props.runningItem ? this.props.runningItem.description : ''}
        </div>

        <div className={className}>
          <p className='counter-time'>
            {infos ? presentFullDuration(infos.leftTimeInSeconds) : '00:00'}
          </p>

          <div className='counter-action-buttons'>
            {this.renderActionButtons()}

            <button
              type='button'
              onClick={this.startLongPause}
              className='counter-action-button'>
              pause 25 minutes
            </button>

            <button
              type='button'
              onClick={this.startShortPause}
              className='counter-action-button'>
              pause 5 minutes
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderActionButtons () {
    if (!this.props.runningItem) { return }

    return (
      <span>
        <button
          type='button'
          onClick={this.props.actions.finishItem}
          className='counter-action-button primary'>
          Finish
        </button>

        <button
          type='button'
          onClick={this.props.actions.cancelItem}
          className='counter-action-button primary'>
          Cancel
        </button>
      </span>
    )
  }
}
