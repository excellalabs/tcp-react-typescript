import React from "react";
import { Link } from "react-router-dom";
import * as styles from './footer.module.scss';

const logo = "https://prod-va-gov-assets.s3-us-gov-west-1.amazonaws.com/img/header-logo.png";

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <header className={styles.footer}>
        <Link to="/home">
          <img src={logo} alt="Go to VA.gov" />
        </Link>
    </header>
  );
};

export default Footer;
