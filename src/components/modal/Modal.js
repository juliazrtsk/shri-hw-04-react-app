import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Modal.css';

const Modal = (props) => {
  const { className, children, onClose, testId } = props;

  const modal = (
    <div className={cn('modal', className)} data-testid={testId}>
      <div className="modal__window">{children}</div>
      <div className="modal__backdrop" onClick={onClose} />
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
  testId: undefined,
};

export default Modal;
