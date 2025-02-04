import type { Fetcher, Key, SWRConfiguration } from "swr";

export type GateRequestSWR = {
  customKey?: (defaultKey: [string, RequestInit]) => Key;
  getPageKey?: <T>(
    defaultKey: [string, RequestInit],
    i: number,
    previousPageData: T | null
  ) => Key;
};
export interface GateRequest<D, P> {
  url: string;
  data?: D;
  params?: P;
  isFile?: boolean;
  cacheConfig?: RequestInit;
  isExternal?: boolean;
  isApiRoutes?: boolean;
  isSecure?: boolean;
  swr?: GateRequestSWR;
  // f?: (key: string | any[]) => Promise<any>;
}

export type GateMethodRequest<D, P> = Omit<
  GateRequest<D, P>,
  "method" | "isFile"
>;

export interface RequestMeta<T, D, P> {
  controller: AbortController;
  cancel: (message?: string | undefined) => void;
  fetch: () => Promise<T>;
  swr: {
    key: () => Key;
    serializedKey: () => string;
    // paginationKey: (i: number, previousPageData: T | null) => Key;
    fetcher: (key: any) => Promise<any>;
  };
  req: GateRequest<D, P>;
}

export interface ApiResponse<T = never> {
  data: T;
  meta: ApiMeta;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ApiMeta<T = never> {
  displayMessage: string;
  result: string;
  statusCode: string;
  systemMessage: string;
}

export interface ErrorResponse<E extends ErrorMeta = ErrorMeta> {
  error: E;
  unAuthorized: boolean;
  api: boolean;
  request?: boolean;
  canceled?: boolean;
  message: string;
}

export interface ValidationError<T> {
  members: (keyof T)[];
  message: string;
}
export interface ErrorMeta<T = unknown> {
  code: number;
  details?: string;
  message: string;
  validationErrors?: ValidationError<T>[] | null;
}

export type ReqKey<R, D, P> = RequestMeta<R, D, P> | null | undefined | false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ReqMetaSWRConfig<R, D, P> =
  | SWRConfiguration<R, ErrorResponse<ErrorMeta>, Fetcher<R, Key>>
  | undefined;


export interface FetcherParams {
  signal?: AbortSignal;
  isExternal?: boolean;
  token?: string;
  isSecure?: boolean;
  isApiRoutes?: boolean;
}
