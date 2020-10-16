import React from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Box,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { DetailViewProps } from "../typings/types";

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      width: "100vw",
      height: "25vh",
      backgroundColor: theme.palette.secondary.main,
    },
    description: {
      width: "800px",
    },
    saveDescription: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    baseBox: {
      height: "100em",
    },
    saveButton: {
      marginLeft: "auto",
    },
  })
);

export default function DetailView({
  car,
  handleSaveClicked,
  favoriteCars,
}: DetailViewProps) {
  const classes = useStyles();
  const onSaveClicked = () => {
    handleSaveClicked(car);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      className={classes.baseBox}
    >
      <Box className={classes.content}></Box>
      <Box display="flex" flexDirection="row" className={classes.description}>
        <Box>
          <Box mb={3} mt={3}>
            <Typography
              variant="h6"
              color="primary"
            >{`${car.manufacturerName} ${car.modelName}`}</Typography>
          </Box>
          <Box mb={3} mt={3}>
            <Typography variant="body1" color="primary" component="p">
              {`Stock # ${car.stockNumber} - ${
                car.mileage.number
              } ${car.mileage.unit.toUpperCase()} - ${car.fuelType} - ${
                car.color
              }`}
            </Typography>{" "}
          </Box>
          <Box>
            <Typography variant="subtitle1" color="primary" component="p">
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that the delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions
            </Typography>
          </Box>
        </Box>
        <Box
          p={3}
          ml={3}
          mt={3}
          className={classes.saveDescription}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" color="primary" component="p">
            If you like this car, click the button and save it in your
            collection of items.
          </Typography>
          <Box className={classes.saveButton} mt={2}>
            <Button variant="contained" color="primary" onClick={onSaveClicked}>
              <Typography color="secondary" variant="subtitle1">
                {favoriteCars[car.stockNumber] ? "Unfavorite" : "Save"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
