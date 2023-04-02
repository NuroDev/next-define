import type { Awaitable, NextApiConfig } from "~/shared";

type SupportedHTTPMethods =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export type NextRouteHandler<
  TParams extends Record<string, any> = Record<string, any>,
  TResponse extends Response = Response
> = (
  request: Request,
  params: {
    params?: TParams;
  }
) => Awaitable<TResponse>;

type DefineAppRouteHandlerOptions<
  TParams extends Record<string, any>,
  TResponse extends Response = Response
> = Record<SupportedHTTPMethods, NextRouteHandler<TParams, TResponse>> &
  Pick<NextApiConfig, "runtime">;

/**
 * **Route**
 *
 * Define a route handler for an app route.
 *
 * @template TParams
 * @template TOptions
 *
 * @param options The options object.
 *
 * @example
 * ```ts
 * import { route } from 'next-define/app';
 *
 * export const { get, runtime } = route({
 * 	runtime: 'edge',
 * 	GET: (_req, { params }) => new Response(JSON.stringify({ params })),
 * });
 * ```
 *
 * @returns {TOptions} The options object.
 */
export function route<
  TParams extends Record<string, any> = Record<string, any>,
  TResponse extends Response = Response,
  TOptions extends Partial<
    DefineAppRouteHandlerOptions<TParams, TResponse>
  > = Partial<DefineAppRouteHandlerOptions<TParams, TResponse>>
>(options: TOptions): TOptions {
  return options;
}
