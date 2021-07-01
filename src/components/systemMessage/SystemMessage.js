import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const SystemMessage = ({ children }) => {
  return (
    <div className="system-msg">
      <div className="system-msg__message">{children}</div>
    </div>
  );
};

SystemMessage.propTypes = {
  children: PropTypes.node,
};

SystemMessage.defaultProps = {
  children: '',
};

export default SystemMessage;
