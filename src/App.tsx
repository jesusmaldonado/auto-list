import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import MainView from "./components/MainView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MainView />
    </ThemeProvider>
  );
}

export default App;
