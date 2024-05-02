import { Grid, Heading, LinkList } from "@amsterdam/design-system-react";
import React from "react";

import CollectionList from "../components/list/CollectionList";
import { navigate } from "../lib/navigate";

const HomePage = () => {
  return (
    <>
      <Grid.Cell span="all">
        <Heading level={2}>Stadsdelen</Heading>
      </Grid.Cell>
      <Grid.Cell span={6}>
        <CollectionList type="stadsdelen">
          {(district) => (
            <LinkList.Link
              href={`/stadsdeel/${district.identificatie}`}
              key={district.naam}
              onClick={navigate()}
            >
              {district.naam}
            </LinkList.Link>
          )}
        </CollectionList>
      </Grid.Cell>
    </>
  );
};

export default HomePage;
