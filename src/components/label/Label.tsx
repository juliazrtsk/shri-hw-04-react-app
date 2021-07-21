import React from 'react';
import cn from 'classnames';

import './Label.css';

export interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{
  isRequired?: boolean;
  error?: boolean;
}

const Label: React.FC<Props> = (props) => {
  const { className, children, isRequired = false, error = false, ...otherProps } = props;
  return (
    <label
      className={cn('label', {
        label_required: isRequired,
        label_error: error,
      }, className)}
      {...otherProps}
    >
      {children}
    </label>
  );
};

export default Label;
