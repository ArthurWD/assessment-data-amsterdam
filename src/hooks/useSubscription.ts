import { useEffect, useState } from "react";

import useAPI from "./useAPI";

// Subscribes to changes of a document. Used internally by other hooks.
export const useSubscription = (path: string) => {
  const API = useAPI();
  const [, setInvalidate] = useState(0);

  useEffect(() => {
    return API.subscribeToDocument(path, setInvalidate);
  }, [path]);
};

export default useSubscription;
