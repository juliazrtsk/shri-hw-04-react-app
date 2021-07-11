import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Label.css';

const Label = ({ children, isRequired, error, ...otherProps }) => {
  return (
    <label
      className={cn('label', {
        label_required: isRequired,
        label_error: error,
      })}
      {...otherProps}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  isRequired: PropTypes.bool,
  error: PropTypes.bool,
};

Label.defaultProps = {
  isRequired: false,
  error: false,
};

export default Label;
