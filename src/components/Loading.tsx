import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      width: "100px",
      height: "80px",
      backgroundColor: theme.palette.secondary.main,
    },
    link: {
      color: theme.palette.primary.contrastText,
    },
    carBox: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    baseBox: {
      width: "100em",
    },
    carBoxTitle: {
      width: "270px",
      height: "32px",
      backgroundColor: theme.palette.secondary.main,
    },
    carBoxMainInfo: {
      width: "270px",
      height: "14px",
      backgroundColor: theme.palette.secondary.main,
    },
    carBoxSecondaryInfo: {
      width: "80px",
      height: "18px",
      backgroundColor: theme.palette.secondary.main,
    },
  })
);
const results = Array.from(Array(10).keys());
export default function Loading() {
  const classes = useStyles();
  return (
    <Box m={3} className={classes.baseBox}>
      <Box mb={2}>
        <Typography variant="h6" color="primary">
          Loading
        </Typography>
      </Box>
      <Box mt={3}>
        {results.map((r, i) => (
          <Box
            key={i}
            elevation={0}
            display="flex"
            p={2}
            mb={2}
            className={classes.carBox}
          >
            <Box mr={3}>
              <Box className={classes.media}></Box>
            </Box>
            <Box p={0}>
              <Box p={0} mb={1} className={classes.carBoxTitle}></Box>
              <Box p={0} mb={2} className={classes.carBoxMainInfo}></Box>
              <Box p={0} className={classes.carBoxSecondaryInfo}></Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
