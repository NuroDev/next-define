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
