import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';

import './Input.css';

const Input = (props) => {
  const { className, mask, ...otherProps } = props;
  const masking = useCallback(() => {
    return mask ? mask : false;
  }, [mask]);
  return (
    <MaskedInput
      className={cn('input', className)}
      mask={masking}
      guide={false}
      {...otherProps}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  mask: PropTypes.array,
};

Input.defaultProps = {
  className: '',
  onChange: () => {},
  mask: null,
};

export default Input;
