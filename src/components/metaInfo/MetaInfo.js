import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './MetaInfo.css';

const MetaInfo = ({ className, children }) => {
  return <div className={cn('meta', className)}>{children}</div>;
};

MetaInfo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

MetaInfo.defaultProps = {
  className: '',
};

export default MetaInfo;
