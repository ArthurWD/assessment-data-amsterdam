import { Alert, Grid, Paragraph } from "@amsterdam/design-system-react";
import React from "react";

import { navigate } from "../lib/navigate";

const NotFoundPage = () => {
  return (
    <Grid.Cell span={6}>
      <Alert severity="warning" title="Niet gevonden">
        <Paragraph>De opgevraagde pagina bestaat niet.</Paragraph>
        <Paragraph>
          <a href="/" onClick={navigate("/")}>
            Naar de homepage
          </a>
        </Paragraph>
      </Alert>
    </Grid.Cell>
  );
};

export default NotFoundPage;
