import { connect } from 'react-redux'
import Content from '../components/Content'

function mapStateToProps (state) {
  return {
    currentListID: state.currentListID
  }
}

export default connect(mapStateToProps)(Content)
