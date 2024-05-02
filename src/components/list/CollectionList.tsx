import { LinkList } from "@amsterdam/design-system-react";
import React, { FC } from "react";

import useCollectionDocument from "../../hooks/useCollectionDocument";
import { DocumentStatus, DocumentTypes, ResourceDocument } from "../api/API";
import Error from "../error/Error";
import Spinner from "../loading/Spinner";

interface CollectionListProps<T extends DocumentTypes> {
  children: (props: ResourceDocument<T>) => JSX.Element;
  query?: string;
  type: T;
  wrapper?: FC;
}

const CollectionList = <T extends DocumentTypes>({
  children,
  type,
  query,
  wrapper,
}: CollectionListProps<T>) => {
  const Wrapper = wrapper ?? LinkList;
  const [items, status] = useCollectionDocument(type, query);

  if (status === DocumentStatus.Error) {
    return <Error />;
  }
  if (status !== DocumentStatus.Present) {
    return <Spinner />;
  }

  return <Wrapper>{items.map((item) => children(item))}</Wrapper>;
};

export default CollectionList;
