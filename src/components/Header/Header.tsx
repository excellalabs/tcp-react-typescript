import React from "react";
import { Link } from "react-router-dom";
import LoginLogoutButton from "../SideNav/LoginLogoutButton/LoginLogoutButton";
import * as styles from './header.module.scss';

const logo = "https://prod-va-gov-assets.s3-us-gov-west-1.amazonaws.com/img/header-logo.png";

const Header: React.FunctionComponent<{}> = () => {
  return (
    <header className={`${styles.header} vads-l-row vads-u-justify-content--space-between`}>
        <Link className={styles.headerLogo} data-testid="va-main-logo" aria-label="va-main-logo" to="/home">
          <img src={logo} alt="Go to VA.gov" />
        </Link>
        <LoginLogoutButton></LoginLogoutButton>
    </header>
  );
};
Header.displayName = 'Header';

export default Header;
