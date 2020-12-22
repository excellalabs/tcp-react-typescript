import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "290px",
      height: "90px",
    },
    cardContent: {
      height: "100%",
    },
    media: {
      height: "100%",
      color: "white",
    },
    text: {
      display: "flex",
      height: "100%",
      width: "100%",
      margin: "auto",
      paddingLeft: "5%",
      alignItems: "center",
      fontSize: "24px",
    },
  })
);