import React from 'react';
import PropTypes from 'prop-types';

import Link from 'components/link/Link';
import Copyright from 'components/copyright/Copyright';
import l10n from 'l10n/config';

import './style.css';

const Footer = ({ className }) => {
  return (
    <footer className={`footer ${className}`}>
      <nav className="footer__links">
        <Link url="#">{l10n.layout_footer_support}</Link>
        <Link url="#">{l10n.layout_footer_learning}</Link>
        <Link url="#">{l10n.layout_footer_ru}</Link>
      </nav>
      <Copyright>{l10n.layout_footer_author}</Copyright>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
