import { useContext } from "react";

import { APIContext } from "../components/api/Provider";

// Returns the API from the context. Used internally by other hooks.
const useAPI = () => useContext(APIContext);

export default useAPI;
