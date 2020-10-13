import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import theme from "../styles/theme";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { ListViewProps, Situations } from "../typings/types";

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      width: "100px",
      height: "80px",
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
  })
);
export default function ListView({
  cars,
  count,
  totalCarsCount,
  page,
  pageCount,
  handlePages,
  ...props
}: ListViewProps) {
  const classes = useStyles();
  const onPageClick = (evt: React.SyntheticEvent) => {
    const situation = evt.currentTarget.dataset.linkEffect as Partial<
      Situations
    >;
    handlePages(situation);
  };
  return (
    <>
      <Box m={3} className={classes.baseBox}>
        <Box mb={2}>
          <Typography variant="body1" color="primary">
            Available Cars
          </Typography>
        </Box>
        <Box mt={2} mb={2}>
          <Typography
            variant="body2"
            color="primary"
          >{`Showing ${count} of ${totalCarsCount} results`}</Typography>
        </Box>
        <Box mt={3}>
          {cars.map((car) => (
            <Box
              key={car.stockNumber + car.mileage.number}
              elevation={0}
              display="flex"
              p={2}
              mb={2}
              className={classes.carBox}
            >
              <Box mr={3}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={car.pictureUrl}
                ></CardMedia>
              </Box>
              <Box p={0}>
                <Box p={0}>
                  <Typography variant="body1" color="primary" component="p">
                    {car.manufacturerName} {car.modelName}
                  </Typography>
                </Box>
                <Box p={0}>
                  <Typography variant="subtitle1" color="primary" component="p">
                    {`Stock # ${car.stockNumber} - ${
                      car.mileage.number
                    } ${car.mileage.unit.toUpperCase()} - ${car.fuelType} - ${
                      car.color
                    }`}
                  </Typography>
                </Box>
                <Box p={0}>
                  <Link className={classes.link}>
                    <Typography variant="subtitle2">View Details</Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box m={2}>
            <Link
              className={classes.link}
              component="button"
              data-link-effect="first"
              onClick={onPageClick}
            >
              <Typography variant="subtitle2">First</Typography>
            </Link>
          </Box>
          <Box m={2}>
            <Link
              className={classes.link}
              onClick={onPageClick}
              data-link-effect="previous"
              component="button"
            >
              <Typography variant="subtitle2">Previous</Typography>
            </Link>
          </Box>
          <Box m={2}>
            <Typography variant="subtitle2">{`Page ${page} of ${pageCount}`}</Typography>
          </Box>
          <Box m={2}>
            <Link
              className={classes.link}
              component="button"
              data-link-effect="next"
              onClick={onPageClick}
            >
              <Typography variant="subtitle2">Next</Typography>
            </Link>
          </Box>
          <Box m={2}>
            <Link
              className={classes.link}
              component="button"
              data-link-effect="last"
              onClick={onPageClick}
            >
              <Typography variant="subtitle2">Last</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
