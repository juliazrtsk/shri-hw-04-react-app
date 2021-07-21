import React from 'react';

import Link from 'components/link/Link';
import Copyright from 'components/copyright/Copyright';

import l10n from 'localization/config';

import './Footer.css';

const Footer: React.FC<React.HTMLProps<HTMLElement>> = ({ className }) => {
  return (
    <footer className={`footer ${className}`}>
      <nav className="footer__links">
        <Link url="/">{l10n.layout_footer_support}</Link>
        <Link url="/">{l10n.layout_footer_learning}</Link>
        <Link url="/">{l10n.layout_footer_ru}</Link>
      </nav>
      <Copyright>{l10n.layout_footer_author}</Copyright>
    </footer>
  );
};

export default Footer;
