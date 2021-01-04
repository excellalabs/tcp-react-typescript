import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";

function Layout() {
  return (
    <div>
      <BrowserRouter>
        <div className="vads-u-display--flex vads-u-flex-direction--column layout-container">
          <main>
            <div />
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default Layout;
