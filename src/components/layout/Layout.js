import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import Header from 'components/header/Header';
import Title from 'components/title/Title';
import ActionButton from 'components/actionButton/ActionButton';
import Footer from 'components/footer/Footer';
import l10n from 'l10n/config';
import routes from 'src/routes';

import './style.css';

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const redirect = useCallback((path) => {
    history.push(path);
  }, []);

  const controls = {
    [routes.home]: [
      { type: 'play', text: 'Run build', onClick: () => {} },
      { type: 'settings', onClick: () => redirect(routes.settings) },
    ],
    [routes.settings]: [],
    [routes.build]: [
      { type: 'restart', text: 'Rebuild', onClick: () => {} },
      { type: 'settings', onClick: () => redirect(routes.settings) },
    ],
  };

  let path = location.pathname;
  if (path.includes(routes.build)) {
    path = routes.build;
  }

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
