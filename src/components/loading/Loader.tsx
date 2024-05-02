import { VisuallyHidden } from "@amsterdam/design-system-react";
import React from "react";
import "./loader.css";

const Loader = () => (
  <div className="loader" title="Laden">
    <VisuallyHidden>Laden</VisuallyHidden>
  </div>
);

export default Loader;
