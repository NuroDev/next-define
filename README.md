<div align="center">
  <h1>
    <br/>
    <br/>
    ❗
    <br />
    next-define
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    Fully typed `define` functions for Next.js</em>
    <br />
    <br />
  
[![Package Version](https://img.shields.io/npm/v/next-define?label=%20&style=for-the-badge)](https://www.npmjs.com/package/next-define)
[![Package Monthly Downloads](https://img.shields.io/npm/dm/next-define?color=blue&label=%20&style=for-the-badge)](https://www.npmjs.com/package/next-define)
[![Docs](https://img.shields.io/badge/-Docs-blue.svg?style=for-the-badge)](https://github.com/nurodev/next-define)

  </sup>
  <br />
  <br />
</div>

## 🚀 Install

Install it locally in your project

```bash
# npm
npm install next-define

# yarn
yarn add next-define

# pnpm
pnpm install next-define
```

## 🦄 Usage

To get started using `next-define`, you can import the `definePage` function from the package and use it to define your page.

```typescript
// pages/index.tsx
import { definePage } from "next-define";

export const { Component } = definePage({
  Component: () => <>Hello World</>,
});

export default Component;
```

```typescript
// pages/index.tsx
import { definePage } from "next-define";

export const { Component, getStaticProps } = definePage({
  getStaticProps: () => ({ props: { name: "John" } }),
  Component: ({ name }) => <>Hello {name}</>,
});

export default Component;
```

```typescript
// pages/index.tsx
import { definePage } from "next-define";

export const { Component, getServerSideProps } = definePage({
  getServerSideProps: () => ({ props: { name: "John" } }),
  Component: ({ name }) => <>Hello {name}</>,
});

export default Component;
```

Or you can import `defineApi` to define a new API route

```typescript
// pages/api/hello.ts
import { defineApi } from "next-define";

export default defineApi((req, res) =>
  res.status(200).json({
    name: "John",
  })
);
```

```typescript
// pages/api/hello.ts
import { defineApi } from "next-define";

export const { config, handler } = defineApi(
  (req, res) =>
    res.status(200).json({
      name: "John",
    }),
  {
    runtime: "nodejs",
  }
);

export default handler;
```

We even offer support for the new app directory beta by importing from the `/app` export

```typescript
// app/page.tsx
import { definePage } from "next-define/app";

const { Component } = definePage({
  Component: ({ params, searchParams }) => <>Hello World</>,
});

export default Component;
```

```typescript
// app/layout.tsx
import { defineLayout } from "next-define/app";

const { Component } = defineLayout(({ children, params }) => <>{children}</>);

export default Component;
```

```typescript
// app/error.tsx
import { defineError } from "next-define/app";

export default defineError(({ error, reset }) => <></>);
```

```typescript
// app/hello/router.ts
import { defineRoute } from "next-define/app";

export const { GET, runtime } = defineRoute({
  runtime: "edge",
  GET: (req, { params }) =>
    new Response(
      JSON.stringify({
        message: "Hello World",
      })
    ),
});
```
