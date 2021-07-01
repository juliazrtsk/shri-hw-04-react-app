import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'components/header/Header';
import Title from 'components/title/Title';
import ActionButton from 'components/actionButton/ActionButton';
import Footer from 'components/footer/Footer';
import l10n from 'l10n/config';
import { matchLocationToPath, paths } from 'router';

import { addBuildToQueue, buildDetailsSelector } from 'store/buildSlice';
import { settingsSelector } from 'store/settingsSlice';
import { toggleModal } from 'store/layoutSlice';

import './style.css';

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const build = useSelector(buildDetailsSelector);
  const settings = useSelector(settingsSelector);

  const redirect = useCallback((path) => {
    history.push(path);
  }, []);

  const rebuild = useCallback(async () => {
    if (build) {
      const { payload, error } = await dispatch(
        addBuildToQueue(build.commitHash)
      );
      if (!error) {
        redirect(paths.build.replace(/:buildId/g, payload.id));
      }
    }
  }, [build]);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal());
  }, [toggleModal]);

  const controls = {
    [paths.home]: [
      {
        type: 'play',
        text: 'Run build',
        onClick: handleToggleModal,
        invisible: !(settings && settings.repoName),
      },
      {
        type: 'settings',
        onClick: () => redirect(paths.settings),
      },
    ],
    [paths.settings]: [],
    [paths.build]: [
      { type: 'restart', text: 'Rebuild', onClick: rebuild },
      { type: 'settings', onClick: () => redirect(paths.settings) },
    ],
  };

  const match = matchLocationToPath(location.pathname);
  const path = match ? match.path : paths.home;

  const renderControls = () =>
    controls[path].map(
      ({ type, text, onClick, invisible }) =>
        !invisible && (
          <ActionButton
            key={`layout_control_${type}`}
            type={type}
            onClick={onClick}
          >
            {text}
          </ActionButton>
        )
    );

  return (
    <div className="layout">
      <Header>
        <Title className="layout__title">{l10n.layout_header_title}</Title>
        <div className="layout__controls">{renderControls()}</div>
      </Header>
      <main className="layout__content">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: '',
};

export default Layout;
