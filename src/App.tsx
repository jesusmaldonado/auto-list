import React, { useState } from "react";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import MainView from "./components/MainView";
import EmptyPage from "./components/EmptyPage";
import Footer from "./components/Footer";

function App() {
  const [linkClicked, setLinkClicked] = useState<boolean>(false);
  const handleLinkClicked = (val) => {
    setLinkClicked(val);
  };
  return (
    <ThemeProvider theme={theme}>
      <Header handleLinkClicked={handleLinkClicked} />
      {!linkClicked && <MainView />}
      {linkClicked && <EmptyPage handleLinkClicked={handleLinkClicked} />}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
