import type { FC } from "react";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticProps,
  PreviewData,
} from "next";
import type { ParsedUrlQuery } from "querystring";

import type { Awaitable } from "~/shared";

// Note: We custom alias here to update the return type
// to allow it to optionally return a promise.
type GetServerSideProps<
  TProps extends Record<string, any>,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<TQuery, TData>
) => Awaitable<GetServerSidePropsResult<TProps>>;

interface PageOptions<
  TProps extends Record<string, any> = Record<string, any>
> {
  Component: FC<TProps>;
}

interface SSRPageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData,
  TSSRHandler extends GetServerSideProps<
    TProps,
    TQuery,
    TData
  > = GetServerSideProps<TProps, TQuery, TData>
> extends PageOptions<
    TSSRHandler extends GetServerSideProps<infer TSSRHandlerReturn>
      ? TSSRHandlerReturn
      : TProps
  > {
  getServerSideProps: TSSRHandler;
}

interface StaticPropsPageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData,
  TGSPHandler extends GetStaticProps<TProps, TParams, TData> = GetStaticProps<
    TProps,
    TParams,
    TData
  >
> extends PageOptions<
    TGSPHandler extends GetStaticProps<infer TGSPHandlerReturn>
      ? TGSPHandlerReturn
      : TProps
  > {
  getStaticProps: TGSPHandler;
}

export function page<
  TProps extends Record<string, any> = Record<string, any>,
  TQuery extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData,
  TReturnProps = SSRPageOptions<TProps, TQuery, TData>["Component"],
  TComponent extends FC<TReturnProps> = FC<TReturnProps>
>(options: SSRPageOptions<TProps, TQuery, TData>): typeof options;

export function page<
  TProps extends Record<string, any> = Record<string, any>,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TData extends PreviewData = PreviewData,
  TComponent extends () => JSX.Element = () => JSX.Element
>(options: StaticPropsPageOptions<TProps>): typeof options;

// export function page<
//   TComponent extends () => JSX.Element = () => JSX.Element
// >(options: { Component: TComponent }): typeof options;

export function page<
  TProps extends Record<string, any> = Record<string, any>,
  TComponent extends FC<TProps> = FC<TProps>
>(options: PageOptions<TProps>): typeof options;

export function page(options: PageOptions | SSRPageOptions) {
  return options;
}
