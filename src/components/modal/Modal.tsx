import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import './Modal.css';

export interface Props extends React.HTMLProps<HTMLElement> {
  shown?: boolean;
  onClose?: () => void;
}

function checkRootExists(root: unknown): asserts root is Element {
  if (!root) {
    throw new Error('No modal root found');
  }
}

const Modal: React.FC<Props> = (props) => {
  const { className, children, shown = false, onClose } = props;

  const modal = shown && (
    <div className={cn('modal', className)}>
      <div className="modal__window">{children}</div>
      <div className="modal__backdrop" onClick={onClose} />
    </div>
  );

  const modalRoot = document.getElementById('modal');
  checkRootExists(modalRoot);

  return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;
