import React from 'react';

import Title from 'components/title/Title';
import l10n from 'l10n/config';

import './style.css';

const Header = () => {
  return (
    <header className="header">
      <Title className="header__title">{l10n.layout_header_title}</Title>
    </header>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
