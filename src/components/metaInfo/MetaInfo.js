import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './MetaInfo.css';

const MetaInfo = ({ className, children, ...otherProps }) => {
  return (
    <div className={cn('meta', className)} {...otherProps}>
      {children}
    </div>
  );
};

MetaInfo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

MetaInfo.defaultProps = {
  className: '',
};

export default MetaInfo;
