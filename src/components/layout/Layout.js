import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import Header from 'components/header/Header';
import Title from 'components/title/Title';
import ActionButton from 'components/actionButton/ActionButton';
import Footer from 'components/footer/Footer';
import l10n from 'l10n/config';
import { matchLocationToPath, paths } from 'router';

import './style.css';

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const redirect = useCallback((path) => {
    history.push(path);
  }, []);

  const controls = {
    [paths.home]: [
      { type: 'play', text: 'Run build', onClick: () => {} },
      { type: 'settings', onClick: () => redirect(paths.settings) },
    ],
    [paths.settings]: [],
    [paths.build]: [
      { type: 'restart', text: 'Rebuild', onClick: () => {} },
      { type: 'settings', onClick: () => redirect(paths.settings) },
    ],
  };

  const match = matchLocationToPath(location.pathname);
  const path = match ? match.path : paths.home;

  const renderControls = () =>
    controls[path].map(({ type, text, onClick }) => (
      <ActionButton
        key={`layout_control_${type}`}
        type={type}
        onClick={onClick}
      >
        {text}
      </ActionButton>
    ));

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
