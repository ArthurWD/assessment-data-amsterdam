export const districtMock = (name = "Test district") => ({
  naam: name,
});

export const districtCollectionMock = (districtNames: string[]) => ({
  _embedded: {
    stadsdelen: districtNames.map((name, index) => ({
      naam: name,
      identificatie: index + 1,
    })),
  },
});

export const neighbourhoodMock = (name = "Test neighbourhood") => ({
  naam: name,
});

export const neighbourhoodCollectionMock = (neighbourhoodNames: string[]) => ({
  _embedded: {
    buurten: neighbourhoodNames.map((name, index) => ({
      naam: name,
      identificatie: index + 1,
    })),
  },
});

export const quarterMock = (name = "Test quarter") => ({
  ligtInStadsdeelId: "1",
  naam: name,
});

export const quarterCollectionMock = (quarterNames: string[]) => ({
  _embedded: {
    wijken: quarterNames.map((name, index) => ({
      naam: name,
      identificatie: index + 1,
    })),
  },
});
