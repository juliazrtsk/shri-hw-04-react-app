import React from 'react';
import PropTypes from 'prop-types';

import './Copyright.css';

const Copyright = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <span className="copyright">
      © {currentYear} {children}
    </span>
  );
};

Copyright.propTypes = {
  children: PropTypes.node,
};

Copyright.defaultProps = {
  children: '',
};

export default Copyright;
