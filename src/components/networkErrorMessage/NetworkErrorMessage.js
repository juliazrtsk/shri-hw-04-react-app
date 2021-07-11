import React from 'react';

import SystemMessage from 'components/systemMessage/SystemMessage';
import l10n from 'l10n/config';

import './NetworkErrorMessage.css';

const NetworkErrorMessage = () => {
  return (
    <SystemMessage className="network-err-msg">
      <div className="network-err-msg__logo" />
      <p className="network-err-msg__description">
        {l10n.network_err_msg_description}
      </p>
    </SystemMessage>
  );
};

NetworkErrorMessage.propTypes = {};

NetworkErrorMessage.defaultProps = {};

export default NetworkErrorMessage;
