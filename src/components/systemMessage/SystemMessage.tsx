import React from 'react';

import './SystemMessage.css';

const SystemMessage: React.FC<React.HTMLProps<HTMLElement>> = ({ children }) => {
  return (
    <div className="system-msg">
      <div className="system-msg__message">{children}</div>
    </div>
  );
};

export default SystemMessage;
