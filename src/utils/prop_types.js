import { PropTypes } from 'react';

export const navigation = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const currentUser = PropTypes.shape({
  uid: PropTypes.string.isRequired,
});


export const itemUniqueKey = PropTypes.string.isRequired;
export const itemTitle = PropTypes.string;
export const itemDesc = PropTypes.string;
export const itemDate = PropTypes.number;
export const item = PropTypes.shape({
  uniqueKey: itemUniqueKey,
  title: itemTitle,
  desc: itemDesc,
});
