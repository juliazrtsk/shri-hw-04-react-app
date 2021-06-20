import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.css';

const Label = ({ children, isRequired, ...otherProps }) => {
  return (
    <label
      className={cn('label', {
        label_required: isRequired,
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
};

Label.defaultProps = {
  isRequired: false,
};

export default Label;
