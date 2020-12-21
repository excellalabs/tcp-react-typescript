import React from "react";
import { Link } from "react-router-dom";
import * as styles from './footer.module.scss';

const logo = "https://www.va.gov/img/homepage/va-logo-white.png";

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <header className={`${styles.footer} vads-l-row vads-u-justify-content--space-between`}>
        <Link to="/home" className={styles.footerLogo}>
          <img src={logo} alt="Go to VA.gov" />
        </Link>
    </header>
  );
};

export default Footer;
