import React, { Component } from 'react'
import * as configsRepository from '../../repositories/configs'

export default class App extends Component {
  constructor () {
    super(...arguments)

    this.state = configsRepository.get()

    this.update = this.update.bind(this)
  }

  update (data) {
    this.setState(data, () => {
      configsRepository.persist(this.state)
    })
  }

  render () {
    return (
      <div>
        <div className='control-group'>
          <label htmlFor='pomodoro-length'>
            Pomodoro length (minutes)
          </label>

          <div className='slider'>
            <input
              type='range'
              id='pomodoro-length'
              min={5}
              max={60}
              step={5}
              value={this.state.pomodoroLength}
              onChange={(evt) => this.update({ pomodoroLength: evt.target.value })} />

            <span>{this.state.pomodoroLength}</span>
          </div>
        </div>

        <div className='control-group'>
          <label htmlFor='short-pause-length'>
            Short Pause Length (minutes)
          </label>

          <div className='slider'>
            <input
              type='range'
              id='short-pause-length'
              min={5}
              max={60}
              step={5}
              value={this.state.shortPauseLength}
              onChange={(evt) => this.update({ shortPauseLength: evt.target.value })} />

            <span>{this.state.shortPauseLength}</span>
          </div>
        </div>

        <div className='control-group'>
          <label htmlFor='long-pause-length'>
            Long Pause Length (minutes)
          </label>

          <div className='slider'>
            <input
              type='range'
              id='long-pause-length'
              min={5}
              max={60}
              step={5}
              value={this.state.longPauseLength}
              onChange={(evt) => this.update({ longPauseLength: evt.target.value })} />

            <span>{this.state.longPauseLength}</span>
          </div>
        </div>
      </div>
    )
  }
}
