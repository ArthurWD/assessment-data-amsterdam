import {
  AvailableCollectionDocument,
  DocumentTypes,
  MissingDocument,
} from "../components/api/API";

import useAPI from "./useAPI";
import useSubscription from "./useSubscription";

// Returns a document containing a collection of a specific resource type and its current DocumentStatus.
// Fetches the document if it's not already present in the store.
function useCollectionDocument<T extends DocumentTypes>(
  type: T,
  query?: string,
): AvailableCollectionDocument<T> | MissingDocument {
  const API = useAPI();

  const path = query ? `${type}?${query}` : type;
  useSubscription(path);

  const documents = API.getDocument<T>(path)?._embedded[type];
  const status = API.getDocumentStatus(path);

  return [documents ?? [], status] as
    | AvailableCollectionDocument<T>
    | MissingDocument;
}

export default useCollectionDocument;
