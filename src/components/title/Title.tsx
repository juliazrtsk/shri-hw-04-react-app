import React from 'react';
import cn from 'classnames';

import './Title.css';

const POSSIBLE_LEVELS = [1, 2, 3, 4, 5, 6] as const;

interface Props extends React.HTMLProps<HTMLTitleElement> {
  level?: typeof POSSIBLE_LEVELS[number];
}

const Title: React.FC<Props> = (props) => {
  const { className, level = 1, children } = props;
  const HComponent: keyof JSX.IntrinsicElements = POSSIBLE_LEVELS.includes(level) ? `h${level}` : 'h1';
  return (
    <HComponent className={cn('title', `title_level_${level}`, className)}>
      {children}
    </HComponent>
  );
};

export default Title;
