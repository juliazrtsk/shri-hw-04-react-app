import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Modal.css';

const Modal = (props) => {
  const { className, children, shown, onClose } = props;

  const modal = shown && (
    <div className={cn('modal', className)}>
      <div className="modal__window">{children}</div>
      <div className="modal__backdrop" onClick={onClose} />
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  shown: PropTypes.bool,
};

Modal.defaultProps = {
  className: '',
  shown: false,
};

export default Modal;
