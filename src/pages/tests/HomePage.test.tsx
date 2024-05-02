import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { districtCollectionMock } from "../../test/mocks";
import { delayedResponse, renderWithAPI } from "../../test/testUtils";
import HomePage from "../HomePage";

describe("HomePage", () => {
  it("renders loader on mount", () => {
    renderWithAPI(<HomePage />);

    expect(screen.getByText("Laden")).toBeInTheDocument();
  });

  it("renders error when receiving error", async () => {
    fetchMock.once(JSON.stringify({}), {
      status: 500,
    });

    renderWithAPI(<HomePage />);

    await waitFor(() =>
      expect(
        screen.getByText("Er ging iets fout bij het ophalen van de gegevens."),
      ).toBeVisible(),
    );
  });

  it("renders the header", () => {
    renderWithAPI(<HomePage />);

    expect(screen.getByText("Stadsdelen")).toBeVisible();
  });

  it("renders list of districts", async () => {
    delayedResponse(districtCollectionMock(["District 1", "District 2"]));

    renderWithAPI(<HomePage />);

    await waitFor(() => expect(screen.getByText("District 1")).toBeVisible());
    await waitFor(() => expect(screen.getByText("District 2")).toBeVisible());
  });

  it("navigates to district on click", async () => {
    delayedResponse(districtCollectionMock(["District 1", "District 2"]));

    renderWithAPI(<HomePage />);

    await waitFor(() => expect(screen.getByText("District 1")).toBeVisible());
    fireEvent.click(screen.getByText("District 1"));

    await waitFor(() =>
      expect(window.location.pathname).toEqual("/stadsdeel/1"),
    );
  });
});
