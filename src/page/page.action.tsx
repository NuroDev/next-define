import type { FC } from "react";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  // GetStaticPaths,
  GetStaticProps,
  PreviewData,
} from "next";
import type { ParsedUrlQuery } from "querystring";

import type { Awaitable } from "~/shared";

// Note: We custom alias here to update the return type
// to allow it to optionally return a promise.
type GetServerSideProps<
  TProps extends Record<string, any> = Record<string, any>,
  TParams extends ParsedUrlQuery = ParsedUrlQuery,
  TPreview extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<TParams, TPreview>
) => Awaitable<GetServerSidePropsResult<TProps>>;

interface PageOptions<
  TProps extends Record<string, any> = Record<string, any>
> {
  Component: FC<TProps>;
  getServerSideProps?: GetServerSideProps;
  getStaticProps?: GetStaticProps;
}

interface GetServerSidePagePageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TGetServerSidePropsHandler extends GetServerSideProps<TProps> = GetServerSideProps<TProps>
> {
  Component: FC<
    // TODO: Fix this type comparison to fix the inferred type if a parameter is passed
    TGetServerSidePropsHandler extends GetServerSideProps<infer TInferredProps>
      ? TInferredProps
      : TProps
  >;
  getServerSideProps: TGetServerSidePropsHandler;
}

interface GetStaticPropsPageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TGetStaticPropsHandler extends GetStaticProps<TProps> = GetStaticProps<TProps>
> {
  Component: FC<
    // TODO: Fix this type comparison to fix the inferred type if a parameter is passed
    TGetStaticPropsHandler extends GetStaticProps<infer TInferredProps>
      ? TInferredProps
      : TProps
  >;
  getStaticProps: TGetStaticPropsHandler;
}

// prettier-ignore
export function page<TProps extends Record<string, any> = Record<string, any>>(options: GetServerSidePagePageOptions<TProps>): typeof options;

// prettier-ignore
export function page<TProps extends Record<string, any> = Record<string, any>>(options: GetStaticPropsPageOptions<TProps>): typeof options;

// prettier-ignore
export function page<TProps extends Record<string, any> = Record<string, any>>(options: PageOptions<TProps>): typeof options;

// prettier-ignore
export function page(options: PageOptions | GetServerSidePagePageOptions | GetStaticPropsPageOptions) {
  return options;
}
