import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import Build from 'components/build/Build';
import ActionButton from 'components/actionButton/ActionButton';
import SettingsMessage from 'components/settingsMessage/SettingsMessage';
import PendingMessage from 'components/pendingMessage/PendingMessage';
import RunBuildModal from 'components/runBuildModal/RunBuildModal';
import { paths } from 'router';
import l10n from 'l10n/config';

import {
  toggleModal,
  modalShownSelector,
  pendingSelector,
} from 'store/layoutSlice';
import { settingsSelector } from 'store/settingsSlice';
import { buildsListSelector } from 'store/buildsSlice';

import './style.css';

const BuildsList = ({ className, loadData }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const pending = useSelector(pendingSelector);
  const settings = useSelector(settingsSelector);
  const builds = useSelector(buildsListSelector);
  const modalShown = useSelector(modalShownSelector);

  useEffect(() => {
    loadData(dispatch);
  }, [loadData, dispatch]);

  const onBuildClick = useCallback((id) => {
    history.push(paths.build.replace(/:buildId/g, id));
  }, []);

  const renderBuilds = useCallback(
    () =>
      builds.map((build) => (
        <Build
          className="builds-list__build"
          key={build.id}
          onClick={onBuildClick}
          {...build}
        />
      )),
    [builds]
  );

  if (pending && !modalShown) {
    return <PendingMessage />;
  }

  if (!settings || !settings.repoName) {
    return <SettingsMessage />;
  }

  return (
    <div className={cn('builds-list', className)}>
      {builds && renderBuilds()}
      <ActionButton className="builds-list__more-button" color="secondary">
        {l10n.buildsList_controls_showMore}
      </ActionButton>
      <RunBuildModal
        shown={modalShown}
        onClose={() => dispatch(toggleModal())}
      />
    </div>
  );
};

BuildsList.propTypes = {
  className: PropTypes.string,
  loadData: PropTypes.func,
};

BuildsList.defaultProps = {
  className: '',
  loadData: () => {},
};

export default BuildsList;
