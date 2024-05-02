import { Grid, Heading, UnorderedList } from "@amsterdam/design-system-react";
import React from "react";

import { DocumentStatus } from "../components/api/API";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import CollectionList from "../components/list/CollectionList";
import Loader from "../components/loading/Loader";
import Spinner from "../components/loading/Spinner";
import useResourceDocument from "../hooks/useResourceDocument";

import ErrorPage from "./ErrorPage";

const QuarterDetailPage = ({ id }: { id: string }) => {
  const [quarter, status] = useResourceDocument("wijken", id);
  const [district, districtStatus] = useResourceDocument(
    "stadsdelen",
    quarter?.ligtInStadsdeelId,
  );

  if (status === DocumentStatus.Error) {
    return <ErrorPage />;
  }
  if (status !== DocumentStatus.Present) {
    return <Spinner />;
  }

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    {
      href: `/stadsdeel/${quarter?.ligtInStadsdeelId}`,
      label:
        districtStatus === DocumentStatus.Present ? district.naam : <Loader />,
    },
  ];

  return (
    <>
      <Grid.Cell span="all">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading level={2}>{quarter.naam}</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Heading level={3}>Buurten</Heading>
        <CollectionList
          query={`ligtInWijk.identificatie=${id}`}
          type="buurten"
          wrapper={UnorderedList}
        >
          {(neighbourhood) => (
            <UnorderedList.Item key={neighbourhood.naam}>
              {neighbourhood.naam}
            </UnorderedList.Item>
          )}
        </CollectionList>
      </Grid.Cell>
    </>
  );
};

export default QuarterDetailPage;
