import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from 'components/button/Button';
import Icon from 'components/icon/Icon';

import './ActionButton.css';

const ActionButton = (props) => {
  const { className, children, type, onClick, testId } = props;
  return (
    <Button
      className={cn('action-button', className)}
      onClick={onClick}
      color="secondary"
      data-testid={testId}
    >
      {type && <Icon className="action-button__icon" type={type} />}
      {children && <span className="action-button__text">{children}</span>}
    </Button>
  );
};

ActionButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

ActionButton.defaultProps = {
  className: '',
  children: '',
  onClick: () => {},
  testId: undefined,
};

export default ActionButton;
