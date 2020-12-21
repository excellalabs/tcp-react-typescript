import React from "react";
import { Link } from "react-router-dom";
import * as styles from './header.module.scss';

const logo = "https://prod-va-gov-assets.s3-us-gov-west-1.amazonaws.com/img/header-logo.png";

const Header: React.FunctionComponent<{}> = () => {
  return (
    <header className={styles.header}>
        <Link to="/home">
          <img src={logo} alt="Go to VA.gov" />
        </Link>
    </header>
  );
};
Header.displayName = 'Header';

export default Header;
