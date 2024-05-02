import { MouseEvent } from "react";

// Notify the Router of a change in the current location so it can render the correct page.
export const notifyRouteChange = () => {
  const pushStateEvent = new CustomEvent("pushstate", {});

  window.dispatchEvent(pushStateEvent);
};

const replaceLocation = (location: string) => {
  history.pushState({}, "", location);
};

// Navigate to a new location without triggering a full page reload.
export const navigate = (location?: string) => (e: MouseEvent) => {
  e.preventDefault();

  replaceLocation(location ?? (e.target as HTMLAnchorElement).href);
  notifyRouteChange();
};
