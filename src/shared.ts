export type Awaitable<T> = T | Promise<T>;

/**
 * @see https://twitter.com/mattpocockuk/status/1622730173446557697
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ReactProps = Prettify<Record<string, unknown>>;

