import type { ReactNode } from "react";

import type { ParamsValue } from "~/shared";

export interface NextLayoutProps<TParams = Record<string, ParamsValue>> {
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
 * import { layout } from "next-define/app";
 *
 * export default layout(({ children }) => (
 *  <div>
 *    <h1>My Layout</h1>
 *    {children}
 *  </div>
 * ));
 * ```
 * @returns The layout page component.
 */
export function layout<
  TParams extends Record<string, unknown>,
  TComponent extends (props: NextLayoutProps<TParams>) => JSX.Element = (
    props: NextLayoutProps<TParams>
  ) => JSX.Element
>(Component: TComponent): TComponent {
  return Component;
}
