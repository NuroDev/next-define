import type { Metadata } from "next";
import type {
  JSXElementConstructor,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from "react";
import type { ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

import type { NextPageProps } from "~/app/page/page.action";

export type Awaitable<T> = T | Promise<T>;

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type ArrayElement<A> = A extends ReadonlyArray<infer T> ? T : never;

export type ParamsValue = string | number | boolean;

interface OpenGraph {
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  description?: string;
  locale?: string;
  siteName?: string;
  title?: string;
  type?: string;
  url?: string;
  // images?: ReadonlyArray<OpenGraphMedia>;
  // videos?: ReadonlyArray<OpenGraphMedia>;
  // audio?: ReadonlyArray<OpenGraphMedia>;
  // profile?: OpenGraphProfile;
  // book?: OpenGraphBook;
  // article?: OpenGraphArticle;
  // video?: OpenGraphVideo;
}

/**
 * @see https://twitter.com/mattpocockuk/status/1622730173446557697
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ReactProps = Prettify<Record<string, unknown>>;

export interface SEO {
  canonical?: string | URL;
  description?: string;
  openGraph?: OpenGraph;
  themeColor?: string;
  title?: string;
  titleTemplate?: string;
  twitter?: Twitter;
}

interface Twitter {
  cardType?: string;
  description?: string;
  handle?: string;
  site?: string;
}

type ByteFormatStr = "b" | "gb" | "kb" | "mb" | "pb" | "tb";
type ByteSize = `${number}${ByteFormatStr}`;

type Region =
  | "arn1"
  | "bom1"
  | "cdg1"
  | "cle1"
  | "cpt1"
  | "dub1"
  | "fra1"
  | "gru1"
  | "hkg1"
  | "hnd1"
  | "iad1"
  | "icn1"
  | "kix1"
  | "lhr1"
  | "pdx1"
  | "sfo1"
  | "sin1"
  | "syd1";

export interface NextApiConfig {
  api?: {
    bodyParser?:
      | false
      | {
          sizeLimit: ByteSize;
        };
    externalResolver?: boolean;
    responseLimit?: ByteSize;
  };
  runtime?: "edge" | "nodejs";
  regions?: Array<Region>;
}

export type GenerateMetadataHandler<
  TParams extends Record<string, any>,
  TSearchParams extends Record<string, any>
> = (
  props: NextPageProps<TParams, TSearchParams>,
  parent?: ResolvingMetadata
) => Awaitable<Metadata>;

export interface NextSegmentConfig {
  /**
   * Change the dynamic behavior of a layout or page to fully static or fully dynamic.
   *
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
   */
  dynamic?: "auto" | "force-dynamic" | "error" | "force-static";
  /**
   * Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
   *
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams
   */
  dynamicParams?: boolean;
  /**
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#fetchcache
   */
  fetchCache?:
    | "auto"
    | "default-cache"
    | "only-cache"
    | "force-cache"
    | "force-no-store"
    | "default-no-store"
    | "only-no-store";
  /**
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#preferredregion
   */
  preferredRegion?: "auto" | "home" | "edge" | "string";
  /**
   * Set the default revalidation time for a layout or page. This option does not override the `revalidate` value set by individual `fetch` requests.
   *
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
   */
  revalidate?: false | "force-cache" | 0 | number;
  /**
   * @see https://beta.nextjs.org/docs/api-reference/segment-config#runtime
   */
  runtime?: NextApiConfig["runtime"];
}

// This is a custom fork of the official `FC` type from React so we can add async support.
export type FC<
  TProps extends Record<string, any>,
  TContext = unknown,
  TReturn extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> = FunctionComponent<TProps, TContext, TReturn>;

interface FunctionComponent<
  TProps extends Record<string, any>,
  TContext = unknown,
  TReturn extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  (props: TProps, context?: TContext): Awaitable<ReactElement<
    TProps,
    TReturn
  > | null>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<TProps>;
  displayName?: string;
  propTypes?: WeakValidationMap<TProps>;
}
