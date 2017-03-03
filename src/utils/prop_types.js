import { PropTypes } from 'react';

export const navigation = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const currentUser = PropTypes.shape({
  uid: PropTypes.string.isRequired,
});

export const itemPropTypesShape = {
  uniqueKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  date: PropTypes.number.isRequired,
};
export const item = PropTypes.shape(itemPropTypesShape);
