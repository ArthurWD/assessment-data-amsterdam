import { VisuallyHidden } from "@amsterdam/design-system-react";
import React from "react";
import "./spinner.css";

const Spinner = () => (
  <div className="spinner" title="Laden">
    <VisuallyHidden>Laden</VisuallyHidden>
  </div>
);

export default Spinner;
