import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();

  fetchMock.resetMocks();
});
