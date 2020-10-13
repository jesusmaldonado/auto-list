import React from "react";
import "./App.css";
import Header from "./components/Header";
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
