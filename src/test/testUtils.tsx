import { render } from "@testing-library/react";
import React, { ReactNode } from "react";

import APIContextProvider from "../components/api/Provider";

export const delayedResponse = (body: unknown) => {
  fetchMock.mockResponseOnce(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(JSON.stringify(body)), 100),
      ),
  );
};

export const renderWithAPI = (component: ReactNode) =>
  render(<APIContextProvider>{component}</APIContextProvider>);

export const setWindowLocation = (location: string) => {
  Object.defineProperty(window, "location", {
    value: new URL(location),
    writable: true,
  });
};
