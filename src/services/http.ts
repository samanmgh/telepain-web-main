import queryString from "query-string";
import type {ErrorResponse, FetcherParams, GateMethodRequest, GateRequest, RequestMeta,} from "@/types";
import stringify from "fast-json-stable-stringify";
import {redirect} from "next/navigation";
import { addHeader, objectToFormData } from "@/utils/http";

class RequestConfig {
  private baseUrl: string;
  private access_token: string;

  constructor(url: string) {
    this.baseUrl = url;
    this.access_token = ""
  }

  private getFetchParams = (url_key: string | any[], config: FetcherParams = {}): [string, RequestInit] => {
    const {signal, token, isSecure = false} = config;
    let url: string = typeof url_key === "string" ? url_key : "";
    let options: RequestInit = {};
    if (url_key instanceof Array) {
      url = url_key[0];
      if (url_key.length > 1) {
        options = {...url_key[1]};
      }
    }
    if (isSecure) {
      if (token) {
        options.headers = addHeader(options.headers, "Authorization", "Bearer " + token);
      }
    }
    if (typeof window !== "undefined" && signal) options.signal = signal;
    return [this.baseUrl + url, options];
  };

  private fetcher = async (url_key: string | any[], config?: FetcherParams): Promise<any> => {
    const [url, options] = this.getFetchParams(url_key, config);
    let code: number = 0;
    try {
      const res = await fetch(url, options);
      code = res.status;
      let d: Record<string, any> | null = null;
      try {
        d = await res.json();
      } catch (e) {
        console.log(e)
        d = null;
      }
      if (!res.ok) {
        const err: ErrorResponse = {
          error: {code, message: d?.error?.message},
          message: d?.error?.message ?? "",
          unAuthorized: false,
          api: false,
          canceled: false,
          request: false,
        };

        if (res.status === 500 || res.status === 400) {
          err.api = true;
          err.error = {...d?.error};
        } else if (res.status === 401 || res.status === 403) {
          err.unAuthorized = true;
        }
        return Promise.reject(err);
      }
      return Promise.resolve(d);
    } catch (e: any) {
      return Promise.reject({
        request: true,
        error: {
          code,
          message: e?.error?.message || e?.message || e?.error || e.type || e,
          details: "",
        },
        message: e?.error?.message || e?.message || e?.error || e.type || e,
      });
    }
  };

  private secureFetcher = async (url_key: string | any[], config?: Omit<FetcherParams, "isSecure">): Promise<any> => {
    try {
      if (this.access_token) {
        redirect('/login');
      }

      return await this.fetcher(url_key, {
        ...config,
        token: this.access_token,
        isSecure: true,
      });
    } catch (e: any) {
      const err = e as ErrorResponse;
      if (err.unAuthorized) {
        if (err.error.code === 401) {
          // add delete Tokens
        }
      }
      return Promise.reject(err);
    }
  };

  private request = <R, D, P>(req: GateRequest<D, P>): RequestMeta<R, D, P> => {
    const {
      url,
      params,
      data,
      cacheConfig = {},
      isFile = false,
      isSecure = false,
    } = req;
    const f = isSecure ? this.secureFetcher : this.fetcher;
    const {headers: cacheHeader, ...restOp} = cacheConfig;
    const controller = new AbortController();
    const {signal} = controller;
    let body: BodyInit | undefined;
    if (data) {
      if (isFile) {
        body = objectToFormData(data);
      } else body = JSON.stringify(data);
    }
    const internalHeaders: Record<string, string> = {
      "Accept": "application/json",
      "credentials": "include",
      "Accept-Language": "fa-IR",
    };

    if (!isFile) internalHeaders["Content-Type"] = "application/json";

    const options: RequestInit = {
      body,
      headers: new Headers({
        ...internalHeaders,
        ...cacheHeader,
      }),
      ...restOp,
    };

    const pStr = params ? queryString.stringify(params, {skipNull: true,}) : "";
    const urlWithParams = url + (pStr ? `?${pStr}` : "");
    const urlWithOptions: [string, RequestInit] = [urlWithParams, options];
    const serializedKey = stringify(urlWithOptions);
    const config: FetcherParams = {isSecure, signal};
    return {
      cancel: () => {
        controller.abort();
      },
      fetch: () => f(urlWithOptions, config),
      swr: {
        key: () =>
          typeof req.swr?.customKey !== "undefined"
            ? req.swr?.customKey(urlWithOptions)
            : serializedKey,
        serializedKey: () => serializedKey,
        fetcher: () => f(urlWithOptions, config),
      },
      controller,
      req,
    };
  };

  public get = <R = void, P = void>(req: GateMethodRequest<never, P>) =>
    this.request<R, never, P>({
      ...req,
      cacheConfig: {...req.cacheConfig, method: "GET"},
    });

  public post = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      cacheConfig: {...req.cacheConfig, method: "POST"},
    });

  public put = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      cacheConfig: {...req.cacheConfig, method: "PUT"},
    });

  public delete = <R = void, D = void, P = never>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      cacheConfig: {...req.cacheConfig, method: "DELETE"},
    });

  public file = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      cacheConfig: {...req.cacheConfig, method: "POST"},
      isFile: true,
    });
}

const http = new RequestConfig(process.env.NEXT_PUBLIC_API_BASE_URL ?? "");

export {http};
