import React from 'react';
import cn from 'classnames';

import {IconType} from "model";
import icons from './iconSprite.svg';

import './Icon.css';

interface Props extends Omit<React.SVGProps<SVGSVGElement>, 'type'> {
  type: IconType;
  color?: 'primary' | 'secondary';
}

const Icon: React.FC<Props> = (props) => {
  const { className, type, color = 'primary' } = props;
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

export default Icon;
