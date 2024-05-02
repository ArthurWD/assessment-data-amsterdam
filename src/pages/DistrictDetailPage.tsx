import { Grid, Heading, LinkList } from "@amsterdam/design-system-react";
import React from "react";

import { DocumentStatus } from "../components/api/API";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import CollectionList from "../components/list/CollectionList";
import Spinner from "../components/loading/Spinner";
import useResourceDocument from "../hooks/useResourceDocument";
import { navigate } from "../lib/navigate";

import ErrorPage from "./ErrorPage";

const DistrictDetailPage = ({ id }: { id: string }) => {
  const [district, status] = useResourceDocument("stadsdelen", id);

  if (status === DocumentStatus.Error) {
    return <ErrorPage />;
  }
  if (status !== DocumentStatus.Present) {
    return <Spinner />;
  }

  const breadcrumbItems = [{ href: "/", label: "Home" }];

  return (
    <>
      <Grid.Cell span="all">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading level={2}>{district.naam}</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Heading level={3}>Wijken</Heading>
        <CollectionList
          query={`ligtInStadsdeel.identificatie=${id}`}
          type="wijken"
        >
          {(quarter) => (
            <LinkList.Link
              href={`/wijk/${quarter.identificatie}`}
              key={quarter.naam}
              onClick={navigate()}
            >
              {quarter.naam}
            </LinkList.Link>
          )}
        </CollectionList>
      </Grid.Cell>
    </>
  );
};

export default DistrictDetailPage;
