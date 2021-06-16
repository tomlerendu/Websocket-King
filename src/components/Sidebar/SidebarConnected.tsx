import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import State from '../../redux/state';
import { savedPayloadsForCurrentProject } from '../../redux/selectors/savedPayloads';
import { currentProject } from '../../redux/selectors/projects';
import Sidebar from './Sidebar';
import { connectionsForWindow } from '../../redux/selectors/connections';
import { tabCreateFromSavedPayload } from '../../redux/actions/tabs';
import { savedPayloadRemove } from '../../redux/actions/saved-payloads';
import { connectionCreateFromSavedPayload } from '../../redux/actions/connections';

function mapStateToProps(state: State) {
  return {
    savedPayloads: savedPayloadsForCurrentProject(state),
    connections: connectionsForWindow(state),
    project: currentProject(state) || null,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onCreateConnectionFromSavedPayload: connectionCreateFromSavedPayload,
      onCreateTabFromSavedPayload: tabCreateFromSavedPayload,
      onSavedPayloadDelete: savedPayloadRemove,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
