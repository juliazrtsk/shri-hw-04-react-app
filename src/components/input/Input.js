import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';

import './Input.css';

const Input = (props) => {
  const { className, mask, error, ...otherProps } = props;

  const masking = useCallback(() => {
    // Specific masked input behaviour
    return mask || false;
  }, [mask]);

  return (
    <>
      <MaskedInput
        className={cn(
          'input',
          {
            input_error: error,
          },
          className
        )}
        mask={masking}
        guide={false}
        {...otherProps}
      />
    </>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  mask: PropTypes.array,
  error: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  onChange: () => {},
  mask: null,
  error: false,
};

export default Input;
