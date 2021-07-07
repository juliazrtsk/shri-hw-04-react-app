import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import SystemMessage from 'components/systemMessage/SystemMessage';
import Button from 'components/button/Button';
import l10n from 'l10n/config';
import { paths } from 'router';

import './SettingsMessage.css';

const SettingsMessage = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push(paths.settings);
  }, []);

  return (
    <SystemMessage className="settings-msg">
      <div className="settings-msg__logo" />
      <p
        className="settings-msg__description"
        data-testid="system-message-settings-unset"
      >
        {l10n.settings_msg_description}
      </p>
      <Button
        color="primary"
        onClick={onClick}
        data-testid="system-message-settings-btn"
      >
        {l10n.settings_msg_controls_open}
      </Button>
    </SystemMessage>
  );
};

SettingsMessage.propTypes = {};

SettingsMessage.defaultProps = {};

export default SettingsMessage;
