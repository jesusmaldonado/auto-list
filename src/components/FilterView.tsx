import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core";
import theme from "../styles/theme";
import Typography from "@material-ui/core/Typography";
import {
  BASE_URL_COLORS,
  BASE_URL_MANUFACTURERS,
} from "../utilities/constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
    },
  })
);

interface ManufacturerCar {
  name: string;
}
interface Manufacturer {
  name: string;
  models: ManufacturerCar[];
}
interface ColorResponse {
  colors: string[];
}
interface ManufacturerResponse {
  manufacturers: Manufacturer[];
}

interface FilterViewProps {
  handleManufacturerChange: (Manufacturer: string) => void;
  handleColorChange: (color: string) => void;
  currentColor: string;
  currentManufacturer: string;
}

export default function FilterView({
  handleManufacturerChange,
  handleColorChange,
  currentColor,
  currentManufacturer,
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
  const onColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    handleColorChange(evt.target.value);
  };
  const onManufacturerChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    handleManufacturerChange(evt.target.value);
  };
  return (
    <Box m={3} display="flex" flexDirection="column">
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
    </Box>
  );
}
