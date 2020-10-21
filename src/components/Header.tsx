import React from "react";
import {
  Link,
  AppBar,
  CardMedia,
  Box,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import { HeaderProps } from "../typings/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme from "../styles/theme";
import autologo from "../assets/autologo.jpg";
const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      width: "200px",
      height: "60px",
    },
    header: {
      height: "80px",
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
    },
  })
);
export default function Header({ handleLinkClicked }: HeaderProps) {
  const classes = useStyles();
  const onLinkClicked = (evt: React.SyntheticEvent) => {
    handleLinkClicked(true);
  };
  return (
    <AppBar position="static" color="transparent" className={classes.header}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex">
          <CardMedia
            className={classes.media}
            component="img"
            src={autologo}
          ></CardMedia>
        </Box>
        <Box display="flex">
          <Box m={3}>
            <Link href="#" onClick={onLinkClicked}>
              <Typography color="primary" variant="body2">
                Purchase
              </Typography>
            </Link>
          </Box>
          <Box m={3}>
            <Link href="#" onClick={onLinkClicked}>
              <Typography color="primary" variant="body2">
                My Orders
              </Typography>
            </Link>
          </Box>
          <Box m={3}>
            <Link href="#" onClick={onLinkClicked}>
              <Typography color="primary" variant="body2">
                Sell
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
