import type { NextApiHandler } from "next";

/**
 * Define a Next.js API handler
 *
 * @param handler - The handler function
 *
 * @template T - The type of the response body
 *
 * @example
 * ```ts
 * export default defineApi((req, res) => {
 *  return res.status(200).json({
 * 		message: "Hello World"
 * 	});
 * });
 * ```
 *
 * @example
 * ```ts
 * export default defineApi<{ foo: string }>((req, res) => {
 * 	return res.status(200).json({
 * 		foo: "bar"
 * 	});
 * });
 * ```
 *
 * @returns The handler function
 */
export function defineApi<T>(handler: NextApiHandler<T>): NextApiHandler<T> {
  return handler;
}
