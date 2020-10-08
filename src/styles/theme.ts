import { createMuiTheme } from "@material-ui/core/styles";
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
        "&:hover": {
          backgroundColor: "#D37324",
        },
      },
    },
  },
  spacing: [0, 8, 12, 24],
  typography: {
    subtitle2: {
      fontSize: 12,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 18,
      fontWeight: 400,
    },
    body1: {
      fontSize: 18,
      fontWeight: 700,
    },
    button: {
      fontSize: 14,
      fontWeight: 400,
    },
    h6: {
      fontSize: 32,
      fontWeight: 700,
    },
    fontFamily: ["Roboto"].join(","),
  },
});
export default theme;
