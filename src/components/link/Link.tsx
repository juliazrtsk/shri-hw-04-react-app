import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './Link.css';

type Props = {
  url: string;
};

const Link: React.FC<Props> = ({ url, children }) => {
  return (
    <RouterLink className="link" to={url}>
      {children}
    </RouterLink>
  );
};

export default Link;
