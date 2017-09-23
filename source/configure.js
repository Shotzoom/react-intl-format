import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import invariant from 'invariant';

export default function configure(
  apiSelector,
  {
    displayName = 'Format'
  } = {}
) {
  invariant(typeof apiSelector === 'function', 'Expected apiSelector to be a function but received \'%s\'.', JSON.stringify(apiSelector));

  function Format(props, context) {
    props.children(apiSelector(context.intl));
  }

  Format.displayName = displayName;

  Format.contextTypes = {
    intl: intlShape.isRequired
  };

  if (process.env.NODE_ENV === 'development') {
    Format.propTypes = {
      children: PropTypes.func.isRequired
    };
  }

  return Format;
}
