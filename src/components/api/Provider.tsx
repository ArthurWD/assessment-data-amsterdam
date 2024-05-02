import React, { FC, PropsWithChildren, createContext, useMemo } from "react";

import { API } from "./API";

export const APIContext = createContext<API>(null as unknown as API);

const APIContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const api = useMemo(() => new API(), []);

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};

export default APIContextProvider;
