import React from 'react';

import './Copyright.css';

const Copyright: React.FC = ({ children }) => {
  const currentYear: number = new Date().getFullYear();
  return (
    <span className="copyright">
      © {currentYear} {children}
    </span>
  );
};

export default Copyright;
