import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import PopupButtons from '../General/Popup/PopupButtons';
import { PopupContext } from '../../providers/PopupProvider';
import FormField from '../General/Form/FormField';
import PopupBody from '../General/Popup/PopupBody';
import FormCheckbox from '../General/Form/FormCheckbox';
import FormTextInputArray from '../General/Form/FormTextInputArray';
import Spacer from '../General/Utilities/Spacer';
import Link from '../General/Styled/Link';
import Connection from '../../models/connection';
import ConnectionValidator from '../../models/connection/validator';
import { connectionUpdateAutoReconnect, connectionUpdateProtocols } from '../../redux/actions/connections';

export interface EditConnectionProps {
  connection: Connection,
  onWebSocketProtocolsChange: typeof connectionUpdateProtocols,
  onWebSocketAutoReconnectChange: typeof connectionUpdateAutoReconnect,
}

export default function EditConnection({
  connection,
  onWebSocketProtocolsChange,
  onWebSocketAutoReconnectChange,
}: EditConnectionProps) {
  const popup = useContext(PopupContext);
  return (
    <Formik
      initialValues={{
        socketProtocols: connection.socketProtocols,
        socketAutoReconnect: connection.socketAutoReconnect,
      }}
      validationSchema={yup.object({
        socketProtocols: ConnectionValidator.socketProtocols,
        socketAutoReconnect: ConnectionValidator.socketAutoReconnect,
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(value) => {
        onWebSocketProtocolsChange(connection, value.socketProtocols);
        onWebSocketAutoReconnectChange(connection, value.socketAutoReconnect);
        popup.pop();
      }}
    >
      <Form>
        <PopupBody>
          <FormField
            title="Websocket Protocols"
            description={(
              <>
                Set the Sec-WebSocket-Protocol header when connecting to a WebSocket.
                {' '}
                It&#39;s not possible to set other headers, see
                {' '}
                <Link
                  href="https://stackoverflow.com/a/4361358"
                  target="_blank"
                  rel="noreferrer"
                >
                  this
                </Link>
                {' '}
                StackOverflow answer for more details.
              </>
            )}
          >
            <FormTextInputArray
              name="socketProtocols"
              addItemCta="Add Protocol"
            />
          </FormField>
          <Spacer />
          <FormField
            title="Auto Reconnect"
          >
            <FormCheckbox
              name="socketAutoReconnect"
              description="Attempt to reconnect to the WebSocket after being disconnected."
            />
          </FormField>
        </PopupBody>
        <PopupButtons actions={[
          {
            label: 'Cancel',
            theme: 'secondary',
            onClick: () => popup.pop(),
          },
          {
            label: 'Save',
            theme: 'primary',
            type: 'submit',
          },
        ]}
        />
      </Form>
    </Formik>
  );
}
