import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import BuildsList from 'components/buildsList/BuildsList';
import ActionButton from 'components/actionButton/ActionButton';
import SettingsMessage from 'components/settingsMessage/SettingsMessage';
import PendingMessage from 'components/pendingMessage/PendingMessage';
import RunBuildModal from 'components/runBuildModal/RunBuildModal';
import l10n from 'l10n/config';

import {
  toggleModal,
  modalShownSelector,
  pendingSelector,
} from 'store/layoutSlice';
import { settingsSelector } from 'store/settingsSlice';
import { buildsListSelector } from 'store/buildsSlice';

import './Builds.css';

const Builds = ({ className, loadData }) => {
  const dispatch = useDispatch();

  const pending = useSelector(pendingSelector);
  const settings = useSelector(settingsSelector);
  const builds = useSelector(buildsListSelector);
  const modalShown = useSelector(modalShownSelector);

  useEffect(() => {
    loadData(dispatch);
  }, [loadData, dispatch]);

  if (pending.loading && !modalShown) {
    return <PendingMessage />;
  }

  if (!settings || !settings.repoName) {
    return <SettingsMessage />;
  }

  return (
    <div className={cn('builds', className)} data-testid="page-builds">
      {builds && <BuildsList builds={builds} />}
      <ActionButton className="builds__more-button" color="secondary">
        {l10n.buildsList_controls_showMore}
      </ActionButton>
      {modalShown && <RunBuildModal onClose={() => dispatch(toggleModal())} />}
    </div>
  );
};

Builds.propTypes = {
  className: PropTypes.string,
  loadData: PropTypes.func,
};

Builds.defaultProps = {
  className: '',
  loadData: () => {},
};

export default Builds;
