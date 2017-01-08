import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../components/Counter'
import * as actions from '../actions/counter'

function mapStateToProps (state) {
  return {
    runningItem: state.runningItem
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
)(Counter)
