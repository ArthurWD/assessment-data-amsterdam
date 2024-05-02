import { Grid, Header } from "@amsterdam/design-system-react";
import React from "react";

import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <Grid.Cell as="article" span="all">
      <Header links={<NavbarLinks />} title="Technisch assessment" />
    </Grid.Cell>
  );
};

export default Navbar;
