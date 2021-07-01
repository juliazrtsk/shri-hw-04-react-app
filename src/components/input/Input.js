import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Input.css';

const Input = (props) => {
  const { className, ...otherProps } = props;
  return <input className={cn('input', className)} {...otherProps} />;
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  className: '',
  onChange: () => {},
};

export default Input;
