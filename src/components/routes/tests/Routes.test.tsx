import { screen, waitFor } from "@testing-library/react";
import React from "react";

import { notifyRouteChange } from "../../../lib/navigate";
import { districtMock, neighbourhoodMock } from "../../../test/mocks";
import {
  delayedResponse,
  renderWithAPI,
  setWindowLocation,
} from "../../../test/testUtils";
import Routes from "../Routes";

describe("Routes", () => {
  it("renders the home page", () => {
    renderWithAPI(<Routes />);

    expect(screen.getByText("Stadsdelen")).toBeVisible();
  });

  it("renders a district", async () => {
    setWindowLocation("https://example.com/stadsdeel/1");
    delayedResponse(districtMock());

    renderWithAPI(<Routes />);

    await waitFor(() =>
      expect(screen.getByText("Test district")).toBeVisible(),
    );
  });

  it("renders a neighbourhood", async () => {
    setWindowLocation("https://example.com/wijk/1");
    delayedResponse(neighbourhoodMock());

    renderWithAPI(<Routes />);

    await waitFor(() =>
      expect(screen.getByText("Test neighbourhood")).toBeVisible(),
    );
  });

  it("renders a not found page", () => {
    setWindowLocation("https://example.com/not_found");

    renderWithAPI(<Routes />);

    expect(screen.getByText("Niet gevonden")).toBeVisible();
  });

  it("rerenders when pushing a new location", async () => {
    setWindowLocation("https://example.com/not_found");
    renderWithAPI(<Routes />);

    expect(screen.queryByText("Stadsdelen")).toBeNull();

    setWindowLocation("https://example.com");
    notifyRouteChange();

    await waitFor(() => expect(screen.getByText("Stadsdelen")).toBeVisible());
  });
});
