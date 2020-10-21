import React from "react";
import {
  Link,
  Typography,
  makeStyles,
  createStyles,
  CardMedia,
  Box,
} from "@material-ui/core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme from "../styles/theme";

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
  totalCarsCount,
  favoriteCars,
  page,
  pageCount,
  handlePages,
  handleDetailClicked,
  // NOTE: this is necessary for <Fade> to work
  ...props
}: ListViewProps) {
  const count = cars.length;
  const classes = useStyles();
  const onPageClick = (evt: React.SyntheticEvent<HTMLElement>) => {
    const situation = evt.currentTarget.dataset.linkEffect as Partial<
      Situations
    >;
    handlePages(situation);
  };
  const onDetailClick = (evt: React.SyntheticEvent<HTMLElement>) => {
    const stockNumber = evt.currentTarget.dataset.stockNumber;
    const car = cars.find((c) => c.stockNumber === Number(stockNumber));
    if (car) {
      handleDetailClicked(car);
    }
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
              <Box p={0} data-testid="car-name">
                <Box p={0} display="flex">
                  {favoriteCars[car.stockNumber] && (
                    <Box mr={1}>
                      <Typography component="span">
                        {favoriteCars[car.stockNumber] ? "⭑" : ""}
                      </Typography>
                    </Box>
                  )}
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
                  <Link
                    className={classes.link}
                    onClick={onDetailClick}
                    data-stock-number={car.stockNumber}
                  >
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
