import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import State from '../../redux/state';
import { projectCreate, projectRemoveRelatedItemsAndDelete } from '../../redux/actions/projects';
import { allProjects } from '../../redux/selectors/projects';
import Projects from './Projects';
import { userInterfaceProjectSwitch } from '../../redux/actions/user-interface-properties';

function mapStateToProps(state: State) {
  return {
    projects: allProjects(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onCreate: projectCreate,
      onSwitch: userInterfaceProjectSwitch,
      onDelete: projectRemoveRelatedItemsAndDelete,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
