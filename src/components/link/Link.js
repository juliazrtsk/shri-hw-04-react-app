import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Link = ({ url, children }) => {
  return (
    <a className="link" href={url}>
      {children}
    </a>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {};

export default Link;
