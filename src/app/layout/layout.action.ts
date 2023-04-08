import type { ReactNode } from "react";
import type { Metadata } from "next";

import type { FC, GenerateMetadataHandler, ParamsValue } from "~/shared";

export interface NextLayoutProps<
  TParams extends Record<string, any> = Record<string, ParamsValue>
> {
  /**
   * **Children**
   *
   * React component containing the route segments the layout is wrapping.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout#props
   */
  children: ReactNode;

  /**
   * **Params** (Optional)
   *
   * The dynamic route parameters object from the root segment down to that layout.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout#props
   */
  params?: TParams;
}

interface NextLayout<
  TParams extends Record<string, any> = Record<string, any>,
  TSearchParams extends Record<string, any> = Record<string, any>
> {
  Component: FC<NextLayoutProps<TParams>>;
  generateMetadata?: GenerateMetadataHandler<TParams, TSearchParams>;
  metadata?: Metadata;
}

/**
 * **Layout**
 *
 * This is the layout page. It is used to wrap the route segments.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout
 *
 * @param Component - The layout page component.
 *
 * @example
 * ```tsx
 * import { defineLayout } from "next-define/app";
 *
 * const { Component } = defineLayout({
 *  Component: ({ children }) => (
 *    <div>
 *      <h1>My Layout</h1>
 *      {children}
 *    </div>
 *  ),
 * });
 *
 * export default Component;
 * ```
 * @returns The layout page component.
 */
export function defineLayout<
  TParams extends Record<string, any> = Record<string, any>,
  TSearchParams extends Record<string, any> = Record<string, any>,
  TOptions extends NextLayout<TParams, TSearchParams> = NextLayout<
    TParams,
    TSearchParams
  >
>(options: TOptions): TOptions {
  return options;
}
