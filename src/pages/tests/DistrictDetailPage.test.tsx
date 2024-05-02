import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { districtMock, quarterCollectionMock } from "../../test/mocks";
import { delayedResponse, renderWithAPI } from "../../test/testUtils";
import DistrictDetailPage from "../DistrictDetailPage";

describe("DistrictDetailPage", () => {
  it("renders loader on mount", () => {
    renderWithAPI(<DistrictDetailPage id="1" />);

    expect(screen.getByText("Laden")).toBeInTheDocument();
  });

  it("renders error when receiving error", async () => {
    fetchMock.once(JSON.stringify({}), {
      status: 500,
    });

    renderWithAPI(<DistrictDetailPage id="1" />);

    await waitFor(() =>
      expect(
        screen.getByText("Er ging iets fout bij het ophalen van de gegevens."),
      ).toBeVisible(),
    );
  });

  it("renders the district name", async () => {
    delayedResponse(districtMock());

    renderWithAPI(<DistrictDetailPage id="1" />);

    await waitFor(() =>
      expect(screen.getByText("Test district")).toBeVisible(),
    );
  });

  it("renders list of quarters", async () => {
    delayedResponse(districtMock());
    delayedResponse(quarterCollectionMock(["Quarter 1", "Quarter 2"]));

    renderWithAPI(<DistrictDetailPage id="1" />);

    await waitFor(() => expect(screen.getByText("Quarter 1")).toBeVisible());
    await waitFor(() => expect(screen.getByText("Quarter 2")).toBeVisible());
  });

  it("navigates to quarter on click", async () => {
    delayedResponse(districtMock());
    delayedResponse(quarterCollectionMock(["Quarter 1", "Quarter 2"]));

    renderWithAPI(<DistrictDetailPage id="1" />);

    await waitFor(() => expect(screen.getByText("Quarter 1")).toBeVisible());
    fireEvent.click(screen.getByText("Quarter 1"));

    await waitFor(() => expect(window.location.pathname).toEqual("/wijk/1"));
  });
});
