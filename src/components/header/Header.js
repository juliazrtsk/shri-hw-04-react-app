import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Header = ({ children }) => {
  return <header className="header">{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: '',
};

export default Header;
