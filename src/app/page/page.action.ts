import type { ArrayElement, ParamsValue, UnwrapPromise } from "~/shared";

type GenerateStaticParamsFn<TParams extends Array<unknown>> = () =>
  | TParams
  | Promise<TParams>;

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

interface NextPagePropsFromGenerateStaticParams<TParams, TSearchParams> {
  /**
   * **params**
   *
   * The dynamic route params object from the root segment down that to that page.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/page#props
   */
  params: TParams;

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

/**
 * **Page**
 *
 * This is the page. It is used to render the route segments.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/page
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
 * export async function generateStaticParams() {
 * return [
 *    { id: "1" },
 *    { id: "2" },
 *    { id: "3" },
 *  ];
 * }
 *
 * export default page<typeof generateStaticParams>(({ params, searchParams }) => (
 *  <div>
 *   <h1>My Page</h1>
 *  </div>
 * ));
 * ```
 *
 * @returns The page component.
 */
export function page<
  TParams extends Record<string, unknown> = Record<string, ParamsValue>,
  TSearchParams extends Record<string, unknown> = Record<string, ParamsValue>,
  TComponent extends (
    props: NextPageProps<TParams, TSearchParams>
  ) => JSX.Element = (
    props: NextPageProps<TParams, TSearchParams>
  ) => JSX.Element
>(Component: TComponent): TComponent;

export function page<
  TGenerateStaticParams extends
    | GenerateStaticParamsFn<TParams>
    | undefined = undefined,
  TSearchParams extends Record<string, unknown> = Record<string, ParamsValue>,
  TParams extends Array<unknown> = Array<unknown>,
  TComponent extends (
    props: NextPagePropsFromGenerateStaticParams<
      TGenerateStaticParams extends GenerateStaticParamsFn<TParams>
        ? ArrayElement<UnwrapPromise<ReturnType<TGenerateStaticParams>>>
        : Record<string, ParamsValue> | undefined,
      TSearchParams
    >
  ) => JSX.Element = (
    props: NextPagePropsFromGenerateStaticParams<
      TGenerateStaticParams extends GenerateStaticParamsFn<TParams>
        ? ArrayElement<UnwrapPromise<ReturnType<TGenerateStaticParams>>>
        : Record<string, ParamsValue> | undefined,
      TSearchParams
    >
  ) => JSX.Element
>(Component: TComponent): TComponent;

export function page<
  TComponent extends (props: any) => JSX.Element = (props: any) => JSX.Element
>(Component: TComponent) {
  return Component;
}
