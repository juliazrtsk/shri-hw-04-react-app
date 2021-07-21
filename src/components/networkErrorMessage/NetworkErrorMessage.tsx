import React from 'react';

import SystemMessage from 'components/systemMessage/SystemMessage';
import l10n from 'localization/config';

import './NetworkErrorMessage.css';

const NetworkErrorMessage: React.FC<React.HTMLProps<HTMLElement>> = () => {
  return (
    <SystemMessage>
      <div className="network-err-msg__logo" />
      <p className="network-err-msg__description">
        {l10n.network_err_msg_description}
      </p>
    </SystemMessage>
  );
};

export default NetworkErrorMessage;
