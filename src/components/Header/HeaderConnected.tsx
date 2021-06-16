import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import State from '../../redux/state';
import { currentProject } from '../../redux/selectors/projects';
import {
  connectionCreate,
  connectionDisconnectSocketAndRemove,
  connectionToggleMaximize,
  connectionUpdateName,
} from '../../redux/actions/connections';
import { connectionsForProject, connectionsForWindow } from '../../redux/selectors/connections';
import { userInterfaceSidebarToggle } from '../../redux/actions/user-interface-properties';
import Header from './Header';
import { closedWindowsForProject, currentWindow } from '../../redux/selectors/windows';
import { windowsReassignConnectionsAndDelete, windowsRemoveClosedForProject } from '../../redux/actions/windows';

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onConnectionCreate: connectionCreate,
      onConnectionToggleMaximize: connectionToggleMaximize,
      onConnectionRemove: connectionDisconnectSocketAndRemove,
      onConnectionUpdateName: connectionUpdateName,
      onSidebarToggle: userInterfaceSidebarToggle,
      onClearClosedWindows: windowsRemoveClosedForProject,
      onReassignWindow: windowsReassignConnectionsAndDelete,
    },
    dispatch,
  );
}

export function mapStateToProps(state: State) {
  const project = currentProject(state);

  return {
    project,
    projectConnections: connectionsForProject(state),
    windowConnections: connectionsForWindow(state),
    windows: closedWindowsForProject(state),
    currentWindow: currentWindow(state),
    sidebarOpen: state.userInterfaceProperties.SidebarOpen.value,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
