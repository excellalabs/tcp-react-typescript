import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  spacer: {
    flex: "1 1 auto",
  },
}));

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <div className="vads-u-display--flex vads-u-flex-direction--column layout-container">
          <Header></Header>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default Layout;
