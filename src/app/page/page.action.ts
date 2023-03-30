import type { FC } from "react";
import type { ParamsValue } from "~/shared";

interface NextPageProps<TParams, TSearchParams> {
  /**
   * **params** (Optional)
   *
   * The dynamic route params object from the root segment down that to that page.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/page#props
   */
  params?: TParams;

  /**
   * **searchParams** (Optional)
   *
   * The URL search params object.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/page#props
   *
   * @example `acme.com/?q=cat` → `{ q: "cat" }`
   */
  searchParams?: TSearchParams;
}

interface NextPage<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TSearchParams extends Record<string, unknown> = Record<string, ParamsValue>
> {
  Component: FC<NextPageProps<TParams, TSearchParams>>;
}

/**
 * **Page**
 *
 * This is the page. It is used to render the route segments.
 *
 * @see https://beta.nextjs.org/docs/optimizing/metadata
 *
 * @param Component - The page component.
 *
 * @example
 * ```tsx
 * import { page } from "next-define/app";
 *
 * export default page(({ params, searchParams }) => (
 *  <div>
 *    <h1>My Page</h1>
 *  </div>
 * ));
 * ```
 *
 * @example
 * ```tsx
 * import { page } from "next-define/app";
 *
 * export default page<{ foo: string }>(({ params, searchParams }) => (
 *  <div>
 *   <h1>Hello {params?.foo}</h1>
 *  </div>
 * ));
 * ```
 *
 * @returns The page component.
 */
export function page<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TSearchParams extends Record<string, unknown> = Record<string, ParamsValue>
>(options: NextPage<TParams, TSearchParams>): NextPage<TParams, TSearchParams> {
  return options;
}
