import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tasks from '../components/Tasks'
import * as actions from '../actions/task'
import * as taskStatuses from '../../constants/taskStatuses'

function mapStateToProps (state) {
  return {
    tasks: state.tasks,
    waitingTasks: state.tasks.filter(task => task.status === taskStatuses.WAITING),
    finishedTasks: state.tasks.filter(task => task.status === taskStatuses.FINISHED).reverse(),
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
)(Tasks)
