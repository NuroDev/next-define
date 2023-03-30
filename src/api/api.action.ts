import type { NextApiRequest, NextApiResponse } from "next";
import type { NextFetchEvent, NextRequest } from "next/server";

import type { Awaitable, NextApiConfig } from "~/shared";

/**
 * Define a Next.js API handler
 *
 * This is a custom fork of the official Next.js API handler type to improve generic return types
 *
 * @param handler - The handler function
 *
 * @template TBody - The type of the response body
 */
type NextApiHandler<TBody = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<TBody>
) => Awaitable<void>;

/**
 * Define a Next.js Edge API handler
 *
 * Since Next.js does not offer a native Edge API handler type, we have to define our own
 *
 * @param request - The request object
 * @param context - The context object
 *
 * @template TResponse - The type of the response
 */
type NextEdgeApiHandler<TResponse extends Response = Response> = (
  request: NextRequest,
  context: NextFetchEvent
) => Awaitable<TResponse>;

/**
 * Define a Next.js API handler
 *
 * @param handler - The handler function
 *
 * @template TParams - The type of the response body
 *
 * @example
 * ```ts
 * import { api } from 'next-define';
 *
 * export default api((req, res) => {
 *  return res.status(200).json({
 * 		message: "Hello World"
 * 	});
 * });
 * ```
 *
 * @example
 * ```ts
 * import { api } from 'next-define';
 *
 * export default api<{ foo: string }>((req, res) => {
 * 	return res.status(200).json({
 * 		foo: "bar"
 * 	});
 * });
 * ```
 *
 * @returns The handler function
 */
export function api<
  TParams extends Record<string, unknown> = Record<string, unknown>
>(handler: NextApiHandler<TParams>): NextApiHandler<TParams>;

/**
 * Define a Next.js API handler
 *
 * @param handler - The handler function
 * @param config - The API config
 *
 * @template TParams - The type of the response body
 * @template TConfig - The type of the API config
 * @template THandler - The type of the handler function
 *
 * @example
 * ```ts
 * import { api } from 'next-define';
 *
 * export const { config, handler } = api<{ foo: string }>(
 *   (_req, res) => res.status(200).json({ message: "Hello World" }),
 *   {
 *     runtime: "nodejs",
 *   }
 * );
 * ```
 *
 * @example
 * ```ts
 * import { api } from 'next-define';
 *
 * export const { config, handler } = api(
 *   (_req, _ctx) => new Response(JSON.stringify({ foo: "bar" })),
 *   {
 *     runtime: "edge",
 *   }
 * );
 * ```
 *
 * @returns The handler function
 */
export function api<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TConfig extends NextApiConfig = NextApiConfig,
  THandler extends
    | NextEdgeApiHandler
    | NextApiHandler<TParams> = TConfig["runtime"] extends "edge"
    ? NextEdgeApiHandler
    : NextApiHandler<TParams>
>(
  handler: THandler,
  config: TConfig
): {
  config: TConfig;
  handler: THandler;
};

export function api<T, U extends NextApiConfig = NextApiConfig>(
  ...args:
    | [handler: NextApiHandler<T>]
    | [handler: NextApiHandler<T>, config?: U]
) {
  const [handler, config] = args;
  if (config)
    return {
      config,
      handler,
    };

  return handler;
}
