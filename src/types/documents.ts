interface Geometry {
  coordinates: Array<Array<[number, number]>>;
  type: "Polygon";
}

export interface DistrictDocument {
  beginGeldigheid: string;
  code: string;
  documentdatum: string;
  documentnummer: string;
  eindGeldigheid?: string;
  geometrie: Geometry;
  identificatie: string;
  ligtInGemeenteId: string;
  naam: string;
  registratiedatum: string;
  volgnummer: number;
}

export interface NeighbourhoodDocument {
  beginGeldigheid: string;
  cbsCode: string;
  code: string;
  documentdatum: string;
  documentnummer: string;
  eindGeldigheid?: string;
  geometrie: Geometry;
  identificatie: string;
  ligtInGgpgebiedId?: string;
  ligtInGgwgebiedId: string;
  ligtInWijkId: string;
  naam: string;
  registratiedatum: string;
  volgnummer: number;
}

export interface QuarterDocument {
  beginGeldigheid: string;
  cbsCode: string;
  code: string;
  documentdatum: string;
  documentnummer: string;
  eindGeldigheid?: string;
  geometrie: Geometry;
  identificatie: string;
  ligtInGgwgebiedId: string;
  ligtInStadsdeelId: string;
  naam: string;
  registratiedatum: string;
  volgnummer: number;
}
