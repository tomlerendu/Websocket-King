import * as yup from 'yup';
import SocketProtocol from '../../types/socket-protocol';

export default () => yup.array()
  .test(
    'protocol-unique',
    'Each protocol must be unique.',
    (protocols) => {
      const values = (protocols as SocketProtocol[]).map((protocol) => protocol.value);
      return (new Set(values)).size === values.length;
    },
  )
  .of(
    yup.object({
      id: yup.string(),
      value: yup.string().test(
        'protocol-complient',
        'Each protocol value is required to be a non-empty string, '
          + 'be in the range U+0021 to U+007E, and not be a separator character. '
          + 'See https://tools.ietf.org/html/rfc6455#page-18 for more information. '
          + 'In general its safe to use ASCII characters for this value.',
        (value) => {
          if (!value) {
            return false;
          }

          return value.length > 0
            && value.replace(/[\x21-\x7E]*/g, '') === ''
            && ![
              '(',
              ')',
              '<',
              '>',
              '@',
              ',',
              ';',
              ':',
              '\\',
              '"',
              '\'',
              '/',
              '[',
              ']',
              '?',
              '=',
              '{',
              '}',
              ' ',
              '\t',
            ].some((character) => value.includes(character));
        },
      ),
    }),
  );
