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
  date: PropTypes.number.isRequired,
  stopTracking: PropTypes.bool,
  endDate: PropTypes.number,
};
export const item = PropTypes.shape(itemPropTypesShape);
