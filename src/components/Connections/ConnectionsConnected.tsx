import { connect } from 'react-redux';
import State from '../../redux/state';
import { connectionsMaximizedForWindow, connectionsMinimizedForWindow } from '../../redux/selectors/connections';
import Connections from './Connections';

function mapStateToProps(state: State) {
  return {
    connectionsMaximized: connectionsMaximizedForWindow(state),
    connectionsMinimized: connectionsMinimizedForWindow(state),
  };
}

export default connect(mapStateToProps)(Connections);
