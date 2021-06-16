import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { socketConnect, socketDisconnect } from '../../../redux/actions/connection-sockets';
import {
  connectionMinimize,
  connectionUpdateName,
  connectionUpdateAutoReconnect,
  connectionUpdateProtocols,
  connectionUpdateSocketUrl,
  connectionDisconnectSocketAndRemove,
} from '../../../redux/actions/connections';
import Header from './Header';
import State from '../../../redux/state';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onWebSocketUrlChange: connectionUpdateSocketUrl,
      onWebSocketNameChange: connectionUpdateName,
      onWebSocketProtocolsChange: connectionUpdateProtocols,
      onWebSocketAutoReconnectChange: connectionUpdateAutoReconnect,
      onWebSocketConnect: socketConnect,
      onWebSocketDisconnect: socketDisconnect,
      onClose: connectionDisconnectSocketAndRemove,
      onMinimize: connectionMinimize,
    },
    dispatch,
  );
}

function mapStateToProps(state: State, { connection }: any) {
  return { connection };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
