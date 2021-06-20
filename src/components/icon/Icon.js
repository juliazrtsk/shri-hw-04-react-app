import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import icons from './iconSprite.svg';

import './style.css';

const Icon = ({ className, type, color }) => {
  const iconClass = cn(
    'icon',
    {
      [`icon_color_${color}`]: color,
    },
    className
  );

  return (
    <svg
      className={iconClass}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="xMinYMin"
    >
      <use href={icons + '#icon-' + type} />
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'commit',
    'calendar',
    'user',
    'stopwatch',
    'restart',
    'play',
    'settings',
    'clear',
    'error',
    'correct',
    'pending',
  ]).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
};

Icon.defaultProps = {
  className: '',
  color: 'primary',
};

export default Icon;
