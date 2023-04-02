import type { FC } from "react";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPaths,
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
  getServerSideProps?: GetServerSideProps<TProps>;
  getStaticPaths?: GetStaticPaths<TProps>;
  getStaticProps?: GetStaticProps<TProps>;
}

interface GetServerSidePagePageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TGetServerSidePropsHandler extends GetServerSideProps<TProps> = GetServerSideProps<TProps>
> {
  // TODO: Fix this type inference
  Component: FC<
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
  // TODO: Fix this type inference
  Component: FC<
    TGetStaticPropsHandler extends GetStaticProps<infer TInferredProps>
      ? TInferredProps
      : TProps
  >;
  getStaticProps: TGetStaticPropsHandler;
}

interface GetStaticPathsPageOptions<
  TProps extends Record<string, any> = Record<string, any>,
  TGetStaticPathsHandler extends GetStaticPaths<TProps> = GetStaticPaths<TProps>,
  TGetStaticPropsHandler extends GetStaticProps<TProps> = GetStaticProps<TProps>
> {
  // TODO: Fix this type inference
  Component: FC<
    TGetStaticPropsHandler extends GetStaticProps<infer TInferredProps>
      ? TInferredProps
      : TProps
  >;
  getStaticPaths: TGetStaticPathsHandler;
  getStaticProps: TGetStaticPropsHandler;
}

// TODO: Add JSDoc comments
// prettier-ignore
export function definePage<TProps extends Record<string, any> = Record<string, any>>(options: GetServerSidePagePageOptions<TProps>): typeof options;

// TODO: Add JSDoc comments
// prettier-ignore
export function definePage<TProps extends Record<string, any> = Record<string, any>>(options: GetStaticPropsPageOptions<TProps>): typeof options;

// TODO: Add JSDoc comments
// prettier-ignore
export function definePage<TProps extends Record<string, any> = Record<string, any>>(options: GetStaticPathsPageOptions<TProps>): typeof options;

// TODO: Add JSDoc comments
// prettier-ignore
export function definePage<TProps extends Record<string, any> = Record<string, any>>(options: PageOptions<TProps>): typeof options;

// prettier-ignore
export function definePage(options: PageOptions | GetServerSidePagePageOptions | GetStaticPropsPageOptions | GetStaticPathsPageOptions) {
  return options;
}
