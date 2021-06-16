import { connect } from 'react-redux';
import Layout from './Layout';
import { isAnyProjectOpen } from './redux/selectors/projects';
import State from './redux/state';

function mapStateToProps(state: State) {
  return {
    projectOpen: isAnyProjectOpen(state),
    projectsExist: Object.values(state.projects).length > 0,
    sidebarOpen: isAnyProjectOpen(state) && state.userInterfaceProperties.SidebarOpen.value,
  };
}

export default connect(mapStateToProps)(Layout);
