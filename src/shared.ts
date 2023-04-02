import type { Metadata } from "next";
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
