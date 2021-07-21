import React from 'react';

import './Header.css';

const Header: React.FC<React.HTMLProps<HTMLElement>> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export default Header;
