import React, {useState, useCallback} from 'react';
import cn from 'classnames';

import './CommitHash.css';

type Props = {
  hash: string;
};

const CommitHash: React.FC<Props> = ({ hash }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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

export default CommitHash;
