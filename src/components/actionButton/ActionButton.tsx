import React from 'react';
import cn from 'classnames';

import Button, { Props as ButtonProps} from 'components/button/Button';
import Icon from 'components/icon/Icon';

import {IconType} from "model";

import './ActionButton.css';

interface Props extends ButtonProps {
  iconType?: IconType;
}

const ActionButton: React.FC<Props> = (props) => {
  const { className, children, iconType, onClick } = props;
  return (
    <Button
      className={cn('action-button', className)}
      onClick={onClick}
      color="secondary"
    >
      {iconType && <Icon className="action-button__icon" type={iconType} />}
      {children && <span className="action-button__text">{children}</span>}
    </Button>
  );
};

export default ActionButton;
