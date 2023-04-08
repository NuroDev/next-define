import type { FC } from "~/shared";

export interface NextErrorPageProps {
  /**
   * **Error**
   *
   * An instance of an Error object. This error can happen on the server or the client.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/error
   */
  error: Error;
  /**
   * **Reset**
   *
   * A function to reset the error boundary, which does not return a response.
   *
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/error
   */
  reset: () => void;
}

/**
 * **Error**
 *
 * This is the error page. It is used to display errors that happen during server-side rendering or in the client-side.
 *
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/error
 *
 * @param Component - The error page component.
 *
 * @example
 * ```tsx
 * import { defineError } from "next-define/app";
 *
 * export default defineError(({ error, reset }) => (
 *    <>
 *      <h1>{error.message}</h1>
 *     <button onClick={reset}>Reset</button>
 *    </>
 * ));
 * ```
 *
 * @returns The error page component.
 */
export function defineError<
  TComponent extends FC<NextErrorPageProps> = FC<NextErrorPageProps>
>(Component: TComponent): TComponent {
  return Component;
}
