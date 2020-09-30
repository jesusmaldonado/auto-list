import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4A4A4A",
    },
    secondary: {
      main: "#EDEDED",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#EA7F2B",
        width: "128px",
        height: "32px",
        "&:focus": {
          backgroundColor: "#D37324",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Save
      </Button>
    </ThemeProvider>
  );
}

export default App;
