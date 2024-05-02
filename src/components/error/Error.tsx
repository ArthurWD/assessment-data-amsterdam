import { Alert, Paragraph } from "@amsterdam/design-system-react";
import React from "react";

const Error = () => (
  <Alert severity="error" title="Niet gelukt">
    <Paragraph>Er ging iets fout bij het ophalen van de gegevens.</Paragraph>
    <Paragraph>Probeer het later nog eens.</Paragraph>
  </Alert>
);

export default Error;
