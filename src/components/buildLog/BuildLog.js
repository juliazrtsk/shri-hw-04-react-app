import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';

import './style.css';

const BuildLog = ({ log, className }) => {
  return (
    <SyntaxHighlighter
      language="shell"
      className={cn('build-log', className)}
      customStyle={{
        padding: '8px 12px',
        borderRadius: '6px',
        color: 'unset',
        background: '#f2f2f2',
        fontSize: '11px',
      }}
      codeTagProps={{ style: { fontFamily: 'Hack, monospace' } }}
    >
      {log}
    </SyntaxHighlighter>
  );
};

BuildLog.propTypes = {
  log: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BuildLog.defaultProps = {
  className: '',
};

export default BuildLog;
