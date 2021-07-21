import React from 'react';
import cn from 'classnames';

import './Button.css';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: 'primary' | 'secondary';
}

const Button: React.FC<Props> = (props) => {
  const { className, children, color = 'primary', ...otherProps } = props;
  const buttonClass = cn(
    'button',
    {
      [`button_color_${color}`]: color,
    },
    className
  );
  return (
    <button className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
