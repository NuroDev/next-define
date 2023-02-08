import type { FunctionComponent } from "react";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import type { ParsedUrlQuery } from "querystring";

import type { Awaitable, ReactProps } from "~/shared";

// Note: We custom alias here to update the return type
// to allow it to optionally return a promise.
type GetServerSideProps<
  TProps extends Record<string, any> = Record<string, any>,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<TQuery, TData>
) => Awaitable<GetServerSidePropsResult<TProps>>;

interface BasePage<T extends Record<string, unknown>> {
  Component: FunctionComponent<T>;
}

interface BasicPage<T extends ReactProps> extends BasePage<T> {}

interface ServerSidePage<T extends ReactProps> extends BasePage<T> {
  getServerSideProps: GetServerSideProps<T>;
}

export function definePage<T extends Record<string, unknown>>(
  page: BasicPage<T>
): BasicPage<T>;
export function definePage<T extends Record<string, unknown>>(
  page: ServerSidePage<T>
): ServerSidePage<T>;
export function definePage<T extends Record<string, unknown>>(
  page: BasicPage<T> | ServerSidePage<T>
): BasicPage<T> | ServerSidePage<T> {
  return page;
}

