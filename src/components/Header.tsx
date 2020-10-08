import React from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import theme from "../styles/theme";
import AppBar from "@material-ui/core/AppBar";
import CardMedia from "@material-ui/core/CardMedia";
import autologo from "../assets/autologo.jpg";
import { makeStyles, createStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      width: "200px",
      height: "60px",
    },
  })
);
export default function Header() {
  const classes = useStyles();
  const preventDefault = (evt: React.SyntheticEvent) => evt.preventDefault();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      style={{ height: "80px" }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex">
          <CardMedia
            className={classes.media}
            component="img"
            src={autologo}
          ></CardMedia>
        </Box>
        <Box display="flex">
          <Box m={2}>
            <Link href="#" onClick={preventDefault}>
              <Typography color="primary" variant="body2">
                Purchase
              </Typography>
            </Link>
          </Box>
          <Box m={2}>
            <Link href="#" onClick={preventDefault}>
              <Typography color="primary" variant="body2">
                Purchase
              </Typography>
            </Link>
          </Box>
          <Box m={2}>
            <Link href="#" onClick={preventDefault}>
              <Typography color="primary" variant="body2">
                Purchase
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
