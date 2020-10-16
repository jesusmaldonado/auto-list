import React from "react";
import { Box, makeStyles, createStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      height: "80px",
      borderTop: `1px solid ${theme.palette.secondary.main}`,
    },
  })
);
export default function Footer() {
  const classes = useStyles();
  return (
    <Box
      className={classes.footer}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex">
        <Typography color="primary" variant="subtitle2">
          © AUTO1 Group 2018
        </Typography>
      </Box>
    </Box>
  );
}
