import { Grid, Screen } from "@amsterdam/design-system-react";
import React from "react";

import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import APIContextProvider from "../api/Provider";
import Navbar from "../navbar/Navbar";
import Routes from "../routes/Routes";

const App = () => {
  return (
    <APIContextProvider>
      <Screen>
        <Grid>
          <Navbar />
          <Routes />
        </Grid>
      </Screen>
    </APIContextProvider>
  );
};

export default App;
