import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.css';

const CommitHash = ({ hash }) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      setExpanded(!expanded);
    },
    [expanded]
  );

  return (
    <div
      className={cn('commit-hash', {
        'commit-hash_expanded': expanded,
        'commit-hash_short': hash.length <= 10,
      })}
      onClick={onClick}
    >
      {hash}
    </div>
  );
};

CommitHash.propTypes = {
  hash: PropTypes.string,
};

CommitHash.defaultProps = {
  hash: '',
};

export default CommitHash;
