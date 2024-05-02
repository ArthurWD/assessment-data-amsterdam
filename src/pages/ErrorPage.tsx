import { Grid } from "@amsterdam/design-system-react";
import React from "react";

import Error from "../components/error/Error";

const ErrorPage = () => {
  return (
    <Grid.Cell span={6}>
      <Error />
    </Grid.Cell>
  );
};

export default ErrorPage;
