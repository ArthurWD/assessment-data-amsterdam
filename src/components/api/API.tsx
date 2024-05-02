import {
  DistrictDocument,
  NeighbourhoodDocument,
  QuarterDocument,
} from "../../types/documents";

export interface DocumentTypesMap {
  buurten: NeighbourhoodDocument;
  stadsdelen: DistrictDocument;
  wijken: QuarterDocument;
}

export type DocumentTypes = keyof DocumentTypesMap;
export type ResourceDocument<T extends DocumentTypes = DocumentTypes> =
  DocumentTypesMap[T] & { _embedded: never };
export interface CollectionDocument<T extends DocumentTypes = DocumentTypes> {
  _embedded: Record<string, ResourceDocument<T>[]>;
}
type Subscription = React.Dispatch<React.SetStateAction<number>>;

export enum DocumentStatus {
  Missing,
  Fetching,
  Present,
  Error,
}

interface DocumentData {
  status: DocumentStatus | undefined;
  subscriptions: Subscription[];
  value: ResourceDocument | CollectionDocument | undefined;
}

export type AvailableResourceDocument<T extends DocumentTypes> = [
  ResourceDocument<T>,
  DocumentStatus.Present,
];
export type AvailableCollectionDocument<T extends DocumentTypes> = [
  ResourceDocument<T>[],
  DocumentStatus.Present,
];

export type MissingDocument = [
  undefined,
  DocumentStatus.Error | DocumentStatus.Fetching | DocumentStatus.Missing,
];

const ROOT = "https://api.data.amsterdam.nl/v1/gebieden/";
const SUCCESS_STATUS = 200;

export class API {
  private documents: {
    [path: string]: DocumentData;
  } = {};

  public constructor() {}

  public getDocument<T extends DocumentTypes>(
    path: string,
  ): ResourceDocument<T> | CollectionDocument<T> | undefined {
    const { value } = this.getDocumentData(path);

    if (this.shouldFetchDocument(path)) {
      this.fetchDocument(path);
    }

    return value as ResourceDocument<T> | undefined;
  }

  public getDocumentStatus(path: string): DocumentStatus {
    return this.getDocumentData(path).status ?? DocumentStatus.Missing;
  }

  public subscribeToDocument(path: string, callback: Subscription): () => void {
    this.initializeResource(path);

    this.documents[path].subscriptions.push(callback);

    // return cleanup function
    return (): void => {
      const index = this.documents[path].subscriptions.indexOf(callback);

      if (index !== -1) {
        this.documents[path].subscriptions.splice(index, 1);
      }
    };
  }

  private broadcastDocumentUpdate(path: string) {
    this.getDocumentSubscriptions(path).forEach((sub) => {
      sub((prev) => prev + 1);
    });
  }

  private fetchDocument(path: string) {
    this.setDocumentStatus(path, DocumentStatus.Fetching);

    fetch(ROOT + path, {
      headers: {},
    })
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
          return response.json().then((json) => {
            this.setDocumentValue(path, json);
          });
        } else {
          this.setDocumentStatus(path, DocumentStatus.Error);
        }

        return Promise.resolve();
      })
      .catch(() => {
        this.setDocumentStatus(path, DocumentStatus.Error);
      });
  }

  private getDocumentData(path: string) {
    return this.documents[path] ?? {};
  }

  private getDocumentSubscriptions(path: string): Subscription[] {
    const { subscriptions } = this.getDocumentData(path);

    return subscriptions ?? [];
  }

  private initializeResource(path: string) {
    if (!this.documents[path]) {
      this.documents[path] = {
        status: DocumentStatus.Missing,
        subscriptions: [],
        value: undefined,
      };
    }
  }

  private setDocument(path: string, partial: Partial<DocumentData>) {
    this.initializeResource(path);

    this.documents[path] = {
      ...this.documents[path],
      ...partial,
    };
  }

  private setDocumentStatus(path: string, status: DocumentStatus) {
    this.setDocument(path, { status });

    this.broadcastDocumentUpdate(path);
  }

  private setDocumentValue(path: string, newValue: ResourceDocument) {
    this.setDocument(path, { value: newValue });

    this.setDocumentStatus(path, DocumentStatus.Present);
  }

  private shouldFetchDocument(path: string): boolean {
    return this.getDocumentStatus(path) === DocumentStatus.Missing;
  }
}
