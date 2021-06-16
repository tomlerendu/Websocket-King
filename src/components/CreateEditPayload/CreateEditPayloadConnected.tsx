import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { savedPayloadCreate, savedPayloadUpdate } from '../../redux/actions/saved-payloads';
import State from '../../redux/state';
import EditPayload from './CreateEditPayload';

function mapStateToProps(state: State, props: any) {
  return {
    name: props.savedPayload?.name || '',
    content: props.savedPayload?.content || '',
  };
}

function mapDispatchToProps(dispatch: any, props: any) {
  return bindActionCreators(
    {
      onSave: (name: string, content: string) => (
        props.savedPayload
          ? savedPayloadUpdate(props.savedPayload, { name, content })
          : savedPayloadCreate(props.project, name, content)
      ),
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPayload);
