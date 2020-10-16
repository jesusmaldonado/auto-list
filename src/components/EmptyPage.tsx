import React from "react";
import {
  Box,
  Link,
  Typography,
  CardMedia,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { EmptyPageProps } from "../typings/types";
import autologo from "../assets/autologo.jpg";
const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      width: "200px",
      height: "60px",
    },
    pageWidth: {
      height: "50rem",
    },
    link: {
      color: theme.palette.primary.contrastText,
    },
  })
);
export default function EmptyPage({ handleLinkClicked }: EmptyPageProps) {
  const classes = useStyles();
  const onLinkClicked = () => {
    handleLinkClicked(false);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={classes.pageWidth}
    >
      <Box mt={2} mb={2}>
        <CardMedia
          className={classes.media}
          component="img"
          src={autologo}
        ></CardMedia>
      </Box>
      <Box mb={2}>
        <Typography variant="h6" color="primary">
          404 - Not Found
        </Typography>
      </Box>
      <Box>
        <Box mb={2}>
          <Typography variant="body1" color="primary">
            Sorry, the page you are looking for does not exist.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body2" color="primary" component="span">
            You can always go back go the{" "}
            <Link href="#" onClick={onLinkClicked} className={classes.link}>
              <Typography variant="body2" component="span">
                homepage
              </Typography>
            </Link>
            <Typography variant="body2" component="span">
              .
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
