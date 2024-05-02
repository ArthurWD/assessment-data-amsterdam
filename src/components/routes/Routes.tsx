import React, { FC, useEffect, useState } from "react";

import DistrictDetailPage from "../../pages/DistrictDetailPage";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import QuarterDetailPage from "../../pages/QuarterDetailPage";

type RouteComponent = FC<Record<string, string>>;

interface Route {
  component: RouteComponent;
  path: RegExp;
}

// Map paths to the corresponding page using regex patterns.
const routes: Route[] = [
  { path: /^\/$/, component: HomePage },
  {
    path: /^\/stadsdeel\/(?<id>\w+)$/,
    component: DistrictDetailPage as RouteComponent,
  },
  {
    path: /^\/wijk\/(?<id>\w+)$/,
    component: QuarterDetailPage as RouteComponent,
  },
];

const matchRoute = (currentPath: string): [FC, Record<string, string>] => {
  for (let i = 0; i < routes.length; i++) {
    const { path, component } = routes[i];

    const match = currentPath.match(path);
    if (match) {
      return [component, match.groups ?? {}];
    }
  }

  return [NotFoundPage, {}];
};

const Routes = () => {
  const [_, invalidate] = useState(0);
  useEffect(() => {
    const listener = () => {
      invalidate((prev) => prev + 1);
    };
    window.addEventListener("popstate", listener);
    window.addEventListener("pushstate", listener);

    // cleanup
    return () => {
      window.removeEventListener("popstate", listener);
      window.removeEventListener("pushstate", listener);
    };
  }, []);

  const path = window.location.pathname;
  const [Page, match] = matchRoute(path);

  return <Page {...match} />;
};

export default Routes;
