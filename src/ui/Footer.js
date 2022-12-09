import React from "react";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.common.blue,
    width: "100%",
    position: "relative",
    zIndex: 1305,
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <img
        className={classes.adornment}
        src="/assets/footerAdornment.svg"
        alt="Decorative Black Slash"
      />
    </footer>
  );
}

export default Footer;
