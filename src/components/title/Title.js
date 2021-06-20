import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.css';

const Title = ({ className, level, children }) => {
  const HComponent = [1, 2, 3].includes(level) ? `h${level}` : 1;
  return (
    <HComponent className={cn('title', `title_level_${level}`, className)}>
      {children}
    </HComponent>
  );
};

Title.propTypes = {
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node.isRequired,
};

Title.defaultProps = {
  className: '',
  level: 1,
};

export default Title;
