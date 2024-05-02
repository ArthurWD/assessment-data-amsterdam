import {
  AvailableResourceDocument,
  DocumentStatus,
  DocumentTypes,
  MissingDocument,
} from "../components/api/API";

import useAPI from "./useAPI";
import useSubscription from "./useSubscription";

// Returns a document containing a resource of a specific resource type and its current DocumentStatus.
// Fetches the document if it's not already present in the store.
function useResourceDocument<T extends DocumentTypes>(
  type: T,
  id?: string,
): AvailableResourceDocument<T> | MissingDocument {
  const API = useAPI();

  const path = `${type}/${id}`;
  useSubscription(path);

  if (!id) {
    return [undefined, DocumentStatus.Missing];
  }

  const document = API.getDocument<T>(path);
  const status = API.getDocumentStatus(path);

  return [document, status] as AvailableResourceDocument<T> | MissingDocument;
}

export default useResourceDocument;
