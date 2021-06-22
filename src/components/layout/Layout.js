import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header/Header';
import Title from 'components/title/Title';
import Footer from 'components/footer/Footer';
import l10n from 'l10n/config';

import './style.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header>
        <Title className="layout__title">{l10n.layout_header_title}</Title>
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
