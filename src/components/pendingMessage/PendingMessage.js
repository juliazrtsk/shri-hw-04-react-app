import React from 'react';

import SystemMessage from 'components/systemMessage/SystemMessage';
import l10n from 'l10n/config';

import './PendingMessage.css';

const PendingMessage = () => {
  return (
    <SystemMessage className="pending-msg">
      <div className="pending-msg__logo" />
      <p
        className="pending-msg__description"
        data-testid="system-message-pending"
      >
        {l10n.pending_msg_description}
      </p>
    </SystemMessage>
  );
};

PendingMessage.propTypes = {};

PendingMessage.defaultProps = {};

export default PendingMessage;
