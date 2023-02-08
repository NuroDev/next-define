import type { ReactNode } from "react";

import type { Awaitable, ParamsValue, SEO } from "~/shared";

interface HeadProps extends SEO {}

interface NextHeadProps<TParams = Record<string, ParamsValue>> {
  /**
   * **Params** (Optional)
   */
  params?: TParams;
}

type DefineHeadOptions<TParams, TProps extends HeadProps> =
  | TProps
  | ((props: NextHeadProps<TParams>) => Awaitable<TProps>);

function BaseHead({
  canonical,
  description,
  openGraph,
  title,
  titleTemplate,
  twitter,
  themeColor,
}: HeadProps): JSX.Element {
  const href = typeof canonical === "string" ? canonical : canonical?.href;

  return (
    <>
      {title && (
        <title>
          {titleTemplate ? titleTemplate.replace("%s", title) : title}
        </title>
      )}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={href} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta charSet="utf-8" />
      <meta name="googlebot" content="index,follow" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* OpenGraph */}
      <meta
        property="og:description"
        content={openGraph?.description || description}
      />
      <meta property="og:image:alt" content={openGraph?.siteName || title} />
      <meta property="og:image:height" content="1064" />
      <meta property="og:image:width" content="1926" />
      <meta property="og:image" content={`${href}/banner.png`} />
      <meta property="og:site_name" content={openGraph?.siteName || title} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={href} />

      {/* Twitter  */}
      <meta name="twitter:card" content={twitter?.cardType} />
      <meta name="twitter:creator" content={twitter?.handle} />
      <meta
        name="twitter:description"
        content={twitter?.description || description}
      />
      <meta name="twitter:image" content={`${href}/banner.png`} />
      <meta name="twitter:site" content={twitter?.site} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={href} />
    </>
  );
}

/**
 * Define a Next.js app directory head file.
 *
 * @param options - Head options
 * @param children - Component children (Optional)
 *
 * @example
 * ```tsx
 * // app/head.tsx
 * import { defineHead } from "next-define/app";
 *
 * export default defineHead({
 *  title: "My App",
 *  description: "My App description",
 *  canonical: 'https://my-app.com',
 *  openGraph: {
 *    siteName: "My App",
 *  },
 *  twitter: {
 *    cardType: "summary_large_image",
 *    handle: "@my-app",
 *    site: "@my-app",
 *  },
 * });
 * ```
 *
 * @returns A function that returns a React component
 */
export function defineHead<
  TParams = Record<string, ParamsValue>,
  TProps extends HeadProps = HeadProps
>(
  options?: DefineHeadOptions<TParams, TProps>,
  children?: ReactNode
): (props: NextHeadProps<TParams>) => Awaitable<JSX.Element> {
  if (typeof options === "function")
    return ({ params }) => {
      const Component = async function Head(): Promise<JSX.Element> {
        return (
          <>
            <BaseHead {...await options({ params })} />
            {children}
          </>
        );
      };

      return Component();
    };

  return function Head(): JSX.Element {
    return (
      <>
        <BaseHead {...options} />
        {children}
      </>
    );
  };
}
