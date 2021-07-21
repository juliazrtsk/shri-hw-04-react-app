import React from 'react';

import SystemMessage from 'components/systemMessage/SystemMessage';
import l10n from 'localization/config';

import './PendingMessage.css';

const PendingMessage: React.FC = () => {
  return (
    <SystemMessage>
      <div className="pending-msg__logo" />
      <p className="pending-msg__description">{l10n.pending_msg_description}</p>
    </SystemMessage>
  );
};

export default PendingMessage;
