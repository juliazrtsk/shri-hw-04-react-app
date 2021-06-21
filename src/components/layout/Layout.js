import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import './style.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
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
