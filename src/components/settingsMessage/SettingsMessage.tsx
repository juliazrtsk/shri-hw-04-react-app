import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import SystemMessage from 'components/systemMessage/SystemMessage';
import Button from 'components/button/Button';

import l10n from 'localization/config';
import { paths } from 'router';

import './SettingsMessage.css';

const SettingsMessage: React.FC<React.HTMLProps<HTMLElement>> = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push(paths.settings);
  }, []);

  return (
    <SystemMessage>
      <div className="settings-msg__logo" />
      <p className="settings-msg__description">
        {l10n.settings_msg_description}
      </p>
      <Button color="primary" onClick={onClick}>
        {l10n.settings_msg_controls_open}
      </Button>
    </SystemMessage>
  );
};


export default SettingsMessage;
