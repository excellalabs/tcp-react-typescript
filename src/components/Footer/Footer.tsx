import React from "react";
import * as styles from './footer.module.scss';

const logo = "https://www.va.gov/img/homepage/va-logo-white.png";

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <footer className={`${styles.footer} vads-l-row vads-u-justify-content--space-between`}>
        <img src={logo} alt="Go to VA.gov" aria-label="va-white-logo" data-testid="va-white-logo" className={styles.footerLogo}/>
    </footer>
  );
};

export default Footer;
