import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './Routes'
import {
  GridContainer,
  Grid,
  GovBanner,
  Header,
  Title,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds'

/* eslint-disable max-lines-per-function */
const Layout = (): React.ReactElement => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen)
  }

  const primaryNavItems = [
    <a key="primaryNav_0" className="usa-nav__link" href="/form">
      <span>Start your form</span>
    </a>,
    <a key="primaryNav_1" className="usa-nav__link" href="/login">
      <span>Login</span>
    </a>,
  ]

  return (
    <BrowserRouter>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <GovBanner />
      <div className={`usa-overlay ${mobileNavOpen ? 'is-visible' : ''}`}></div>
      <Header basic>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title id="basic-logo">
              <a href="/" title="Home" aria-label="Home">
                Refugee/Asylee Relative Petition
              </a>
            </Title>
            <NavMenuButton
              label="Menu"
              onClick={toggleMobileNav}
              className="usa-menu-btn"
            />
          </div>
          <PrimaryNav
            aria-label="Primary navigation"
            items={primaryNavItems}
            onToggleMobileNav={toggleMobileNav}
            mobileExpanded={mobileNavOpen}
          />
        </div>
      </Header>

      <div className="usa-section">
        <GridContainer>
          <Grid row gap>
            <main
              className="usa-layout-docs__main desktop:grid-col-12 usa-prose usa-layout-docs"
              id="main-content"
            >
              <Routes />
            </main>
          </Grid>
        </GridContainer>
      </div>
    </BrowserRouter>
  )
}
/* eslint-enable max-lines-per-function */

export default Layout
