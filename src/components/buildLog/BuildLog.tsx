import React from 'react';
import cn from 'classnames';

import SyntaxHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter";

import './BuildLog.css';

interface Props extends SyntaxHighlighterProps {
  className?: string;
  log: string;
}

const BuildLog: React.FC<Props> = ({ log, className }) => {
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
        boxSizing: 'border-box',
      }}
      codeTagProps={{ style: { fontFamily: 'Hack, monospace' } }}
    >
      {log}
    </SyntaxHighlighter>
  );
};

export default BuildLog;
