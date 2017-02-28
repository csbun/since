import { PropTypes } from 'react';

export const navigation = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const currentUser = PropTypes.shape({
  uid: PropTypes.string.isRequired,
});
