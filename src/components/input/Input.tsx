import React, { useCallback } from 'react';
import cn from 'classnames';
import MaskedInput, {maskArray as MaskArray, MaskedInputProps} from 'react-text-mask';

import './Input.css';

interface Props extends MaskedInputProps {
  mask?: MaskArray;
  error?: boolean;
}

const Input: React.FC<Props> = (props) => {
  const { className, mask, error, ...otherProps } = props;

  const masking = useCallback((): MaskArray => {
    // Specific masked input behaviour
    return mask || false;
  }, [mask]);

  return (
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
  );
};

export default Input;
