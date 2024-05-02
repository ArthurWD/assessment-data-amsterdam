import { render, screen } from "@testing-library/react";
import React from "react";

import App from "../App";

describe("App", () => {
  it("renders the navbar", () => {
    render(<App />);

    expect(screen.getByText("Ga naar de homepage")).toBeInTheDocument();
  });

  it("renders the homepage", () => {
    render(<App />);

    expect(screen.getByText("Stadsdelen")).toBeVisible();
  });
});
