import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useUserState } from "./context/UserContext/UserContext";
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

function Layout(props: any) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { employeeInfo } = useUserState();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <div className="vads-u-display--flex vads-u-flex-direction--column layout-container">
          <Header></Header>
        {/* <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <SideNav></SideNav>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <SideNav></SideNav>
            </Drawer>
          </Hidden>
        </nav> */}
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
