import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/button/Button';
import l10n from 'l10n/config';
import { paths } from 'router';

import './style.css';

const SettingsConfig = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push(paths.settings);
  }, []);

  return (
    <div className="settings-config">
      <div className="settings-config__logo" />
      <p className="settings-config__description">
        {l10n.settings_config_description}
      </p>
      <Button color="primary" onClick={onClick}>
        {l10n.settings_config_controls_open}
      </Button>
    </div>
  );
};

SettingsConfig.propTypes = {};

SettingsConfig.defaultProps = {};

export default SettingsConfig;
