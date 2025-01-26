import type { ReqKey, ErrorResponse, ReqMetaSWRConfig } from "@/types";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export function useRequest<R = unknown, D = unknown, P = unknown>(
  meta: ReqKey<R, D, P>,
  config?: ReqMetaSWRConfig<R, D, P>
) {
  return useSWR<R, ErrorResponse>(
    meta ? meta.swr.key() : meta,
    meta ? meta.swr.fetcher : null,
    config
  );
}

export function useRequestImmutable<R = unknown, D = unknown, P = unknown>(
  meta: ReqKey<R, D, P>,
  config?: ReqMetaSWRConfig<R, D, P>
) {
  return useSWRImmutable<R, ErrorResponse>(
    meta ? meta.swr.key() : meta,
    meta ? meta.swr.fetcher : null,
    config
  );
}
