interface NextErrorPageProps {
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
 * import { error } from "next-define/app";
 *
 * export default error(({ error, reset }) => (
 *    <>
 *      <h1>{error.message}</h1>
 *     <button onClick={reset}>Reset</button>
 *    </>
 * ));
 * ```
 *
 * @returns The error page component.
 */
export function error<
  TComponent extends (props: NextErrorPageProps) => JSX.Element = (
    props: NextErrorPageProps
  ) => JSX.Element
>(Component: TComponent): TComponent {
  return Component;
}
