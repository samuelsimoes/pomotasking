import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pomodoros from '../components/Pomodoros'
import * as actions from '../actions/pomodoro'
import * as pomodoroStatuses from '../../constants/pomodoroStatuses'

function mapStateToProps (state) {
  return {
    pomodoros: state.pomodoros,
    waitingPomodoros: state.pomodoros.filter(pomodoro => pomodoro.status === pomodoroStatuses.WAITING),
    finishedPomodoros: state.pomodoros.filter(pomodoro => pomodoro.status === pomodoroStatuses.FINISHED).reverse(),
    currentListID: state.currentListID
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoros)
