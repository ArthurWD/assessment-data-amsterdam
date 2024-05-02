import { screen, waitFor } from "@testing-library/react";
import React from "react";

import {
  districtMock,
  neighbourhoodCollectionMock,
  quarterMock,
} from "../../test/mocks";
import { delayedResponse, renderWithAPI } from "../../test/testUtils";
import QuarterDetailPage from "../QuarterDetailPage";

describe("QuarterDetailPage", () => {
  it("renders loader on mount", () => {
    renderWithAPI(<QuarterDetailPage id="1" />);

    expect(screen.getByText("Laden")).toBeInTheDocument();
  });

  it("renders error when receiving error", async () => {
    fetchMock.once(JSON.stringify({}), {
      status: 500,
    });

    renderWithAPI(<QuarterDetailPage id="1" />);

    await waitFor(() =>
      expect(
        screen.getByText("Er ging iets fout bij het ophalen van de gegevens."),
      ).toBeVisible(),
    );
  });

  it("renders the quarter name", async () => {
    delayedResponse(quarterMock());

    renderWithAPI(<QuarterDetailPage id="1" />);

    await waitFor(() => expect(screen.getByText("Test quarter")).toBeVisible());
  });

  it("renders list of neighbourhoods", async () => {
    fetchMock
      .once(JSON.stringify(quarterMock()))
      .once(JSON.stringify(districtMock()))
      .once(
        JSON.stringify(
          neighbourhoodCollectionMock(["Neighbourhood 1", "Neighbourhood 2"]),
        ),
      );

    renderWithAPI(<QuarterDetailPage id="1" />);

    await waitFor(() =>
      expect(screen.getByText("Neighbourhood 1")).toBeVisible(),
    );
    await waitFor(() =>
      expect(screen.getByText("Neighbourhood 2")).toBeVisible(),
    );
  });

  it("renders the district in the breadcrumb", async () => {
    fetchMock
      .once(JSON.stringify(quarterMock()))
      .once(JSON.stringify(districtMock()))
      .once(
        JSON.stringify(
          neighbourhoodCollectionMock(["Neighbourhood 1", "Neighbourhood 2"]),
        ),
      );

    renderWithAPI(<QuarterDetailPage id="1" />);

    await waitFor(() =>
      expect(screen.getByText("Test district")).toBeVisible(),
    );
  });
});
