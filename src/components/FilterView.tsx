import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Box,
  makeStyles,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme from "../styles/theme";
import {
  BASE_URL_COLORS,
  BASE_URL_MANUFACTURERS,
} from "../utilities/constants";
import {
  Manufacturer,
  ManufacturerResponse,
  ColorResponse,
  FilterViewProps,
} from "../typings/types";

const useStyles = makeStyles((theme) =>
  createStyles({
    filterBox: {
      border: `1px solid ${theme.palette.secondary.main}`,
      height: "300px",
      padding: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
    },
    filterButton: {
      marginLeft: "auto",
    },
  })
);

export default function FilterView({
  handleManufacturerChange,
  handleColorChange,
  currentColor,
  currentManufacturer,
  handleFilterClicked,
  ...props
}: FilterViewProps) {
  const classes = useStyles();
  const [colors, setColors] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  useEffect(() => {
    fetch(`${BASE_URL_COLORS}`)
      .then((resp) => resp.json())
      .then((data: ColorResponse) => {
        const colors: string[] = data.colors;
        setColors(colors);
      });
    fetch(`${BASE_URL_MANUFACTURERS}`)
      .then((resp) => resp.json())
      .then((data: ManufacturerResponse) => {
        const manufacturers: Manufacturer[] = data.manufacturers;
        setManufacturers(manufacturers);
      });
  }, []);
  const onColorChange = (
    evt: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    evt.persist();
    if (evt.target && evt?.target.value) {
      handleColorChange(String(evt?.target.value));
    }
  };
  const onManufacturerChange = (
    evt: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    evt.persist();
    if (evt.target && evt?.target.value) {
      handleManufacturerChange(String(evt?.target.value));
    }
  };
  return (
    <Box
      m={3}
      display="flex"
      flexDirection="column"
      className={classes.filterBox}
      {...props}
    >
      <Box>
        <FormControl
          variant="standard"
          color="primary"
          className={classes.formControl}
        >
          <Box mb={2}>
            <Typography color="primary" variant="body2">
              Color
            </Typography>
          </Box>
          <Select
            variant="outlined"
            displayEmpty={true}
            value={currentColor}
            onChange={onColorChange}
          >
            <MenuItem value="">
              <Typography color="primary" variant="subtitle1">
                All car colors
              </Typography>
            </MenuItem>
            {colors.map((color: string) => (
              <MenuItem value={color} key={color}>
                <Typography color="primary" variant="subtitle1">
                  {color}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl
          variant="standard"
          color="primary"
          className={classes.formControl}
        >
          <Box mb={2}>
            <Typography color="primary" variant="body2">
              Manufacturer
            </Typography>
          </Box>
          <Select
            variant="outlined"
            value={currentManufacturer}
            displayEmpty={true}
            onChange={onManufacturerChange}
          >
            <MenuItem value="">
              <Typography color="primary" variant="subtitle1">
                All manufacturers
              </Typography>
            </MenuItem>
            {manufacturers.map((man: Manufacturer) => (
              <MenuItem value={man.name} key={man.name}>
                <Typography color="primary" variant="subtitle1">
                  {man.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.filterButton} m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterClicked}
        >
          <Typography color="secondary" variant="subtitle1">
            Filter
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
