import React from 'react';
import cn from 'classnames';

import './MetaInfo.css';

const MetaInfo: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  const { className, children } = props;
  return <div className={cn('meta', className)}>{children}</div>;
};

export default MetaInfo;
