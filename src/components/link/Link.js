import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import './style.css';

const Link = ({ url, children }) => {
  return (
    <RouterLink className="link" to={url}>
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {};

export default Link;
