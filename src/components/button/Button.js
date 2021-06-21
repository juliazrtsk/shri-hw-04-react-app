import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.css';

const Button = (props) => {
  const { className, children, disabled, color, ...otherProps } = props;
  const buttonClass = cn(
    'button',
    {
      [`button_color_${color}`]: color,
    },
    className
  );
  return (
    <button className={buttonClass} disabled={disabled} {...otherProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  color: 'primary',
  disabled: false,
};

export default Button;
